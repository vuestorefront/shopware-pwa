import { setup, onConfigChange } from "@shopware-pwa/shopware-6-client";
import {
  setStore,
  useUser,
  useCart,
  useSessionContext,
} from "@shopware-pwa/composables";

export default async ({ app, store }) => {
  if (!app.$cookies) {
    throw "Error cookie-universal-nuxt module is not applied in nuxt.config.js";
  }
  const contextToken = app.$cookies.get("sw-context-token") || "";
  const languageId = app.$cookies.get("sw-language-id") || "";

  /**
   * Setup Shopware API client
   */
  setup({
    endpoint: "<%= options.shopwareEndpoint %>",
    accessToken: "<%= options.shopwareAccessToken %>",
    contextToken,
    languageId,
  });
  /**
   * Save current contextToken when its change
   */
  onConfigChange(({ config }) => {
    try {
      app.$cookies.set("sw-context-token", config.contextToken, {
        maxAge: 60 * 60 * 24 * 365,
      });
      app.$cookies.set("sw-language-id", config.languageId, {
        maxAge: 60 * 60 * 24 * 365,
      });
    } catch (e) {
      // Sometimes cookie is set on server after request is send, it can fail silently
    }
  });

  // Temporary fix for SSR and reactivity
  setStore(store);

  const { refreshSessionContext } = useSessionContext();
  const { refreshUser } = useUser();
  const { refreshCart } = useCart();
  await refreshSessionContext();
  await refreshUser();
  await refreshCart();
};
