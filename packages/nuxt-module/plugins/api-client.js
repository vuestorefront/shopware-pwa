import { createInstance } from "@shopware-pwa/shopware-6-client";
import {
  useUser,
  useCart,
  useSessionContext,
  createShopware,
  ShopwareVuePlugin,
  useIntercept,
} from "@shopware-pwa/composables";
import { reactive, isVue2, Vue2 } from "vue-demi";

if (isVue2) {
  Vue2.use(ShopwareVuePlugin, {
    enableDevtools:
      process.env.ENABLE_DEVTOOLS === "true" ||
      process.env.NODE_ENV !== "production",
  });
}

const apiDefaults = JSON.parse(`<%= JSON.stringify(options.apiDefaults) %>`);

export default async ({ app }, inject) => {
  if (!app.$cookies) {
    throw "Error cookie-universal-nuxt module is not applied in nuxt.config.js";
  }
  
  /**
   * get contextToken from localStorage when cookie lost in redirects
   */
  if (process.client) {
    if (!app.$cookies.get("sw-context-token") && typeof localStorage !== "undefined") {
      app.$cookies.set(
        "sw-context-token",
        localStorage.getItem("sw-context-token"),
        {
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "Lax",
          path: "/",
        }
      )
    }
    localStorage.removeItem("sw-context-token")
  }

  function getCookiesConfig(app) {
    return {
      contextToken: app.$cookies.get("sw-context-token") || "",
      languageId: app.$cookies.get("sw-language-id") || "",
    };
  }

  const { contextToken, languageId } = getCookiesConfig(app);

  /**
   * Setup Shopware API client
   */
  const instance = createInstance({
    endpoint: "<%= options.shopwareEndpoint %>",
    accessToken: "<%= options.shopwareAccessToken %>",
    timeout: "<%= options.shopwareApiClient.timeout %>",
    auth: {
      username:
        "<%= options.shopwareApiClient.auth ? options.shopwareApiClient.auth.username : undefined %>",
      password:
        "<%=  options.shopwareApiClient.auth ? options.shopwareApiClient.auth.password : undefined %>",
    },
    contextToken,
    languageId,
  });

  let sharedStore;
  if (process.server) {
    sharedStore = reactive({});
    app.context.ssrContext.nuxt.sharedStore = sharedStore;
  } else {
    // Client side
    sharedStore = reactive(window.__NUXT__.sharedStore || {});
  }
  /**
   * Save current contextToken when its change
   */
  instance.onConfigChange(({ config }) => {
    try {
      app.$cookies.set("sw-context-token", config.contextToken, {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "Lax",
        path: "/",
      });
      app.$cookies.set("sw-language-id", config.languageId, {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "Lax",
        path: "/",
      });
    } catch (e) {
      // Sometimes cookie is set on server after request is send, it can fail silently
    }
  });

  const shopwarePlugin = createShopware(app, {
    initialStore: sharedStore,
    shopwareDefaults: apiDefaults,
    apiInstance: instance,
  });
  inject("shopware", shopwarePlugin);
  if (isVue2) {
    app.shopware = shopwarePlugin;
  }

  const { setup } = app;
  app.setup = function (...args) {
    let result = {};
    if (setup instanceof Function) {
      result = setup(...args) || {};
    }
    if (process.client) {
      const { refreshSessionContext } = useSessionContext();
      refreshSessionContext();
      const { refreshUser } = useUser();
      refreshUser();
      const { refreshCart } = useCart();
      refreshCart();
      const { broadcast } = useIntercept();

      document.addEventListener("visibilitychange", (activeInfo) => {
        const { contextToken, languageId } = getCookiesConfig(app);
        if (document.visibilityState === "visible") {
          instance.update({ contextToken, languageId });
          refreshSessionContext();
          refreshUser();
          refreshCart();
          broadcast("tab-visible");
        }
      });
    }
    return result;
  };
};
