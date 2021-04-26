import { createInstance } from "@shopware-pwa/shopware-6-client";
import {
  useUser,
  useCart,
  useSessionContext,
  useSharedState,
} from "@shopware-pwa/composables";
import { reactive } from "@vue/composition-api";

export default async ({ app }, inject) => {
  if (!app.$cookies) {
    throw "Error cookie-universal-nuxt module is not applied in nuxt.config.js";
  }
  const contextToken = app.$cookies.get("sw-context-token") || "";
  const languageId = app.$cookies.get("sw-language-id") || "";

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

  if (process.server) {
    const sharedStore = reactive({});
    app.context.ssrContext.nuxt.sharedStore = sharedStore;
    inject("sharedStore", sharedStore);
  } else {
    // Client side
    const sharedStore = reactive(window.__NUXT__.sharedStore || {});
    inject("sharedStore", sharedStore);
  }

  inject("shopwareApiInstance", instance);
  inject("interceptors", {}); // functionality for useIntercept composable

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

  if (process.client) {
    const { refreshSessionContext } = useSessionContext(app);
    refreshSessionContext();
    const { refreshUser } = useUser(app);
    refreshUser();
    const { refreshCart } = useCart(app);
    refreshCart();
  }
};
