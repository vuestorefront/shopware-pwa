import { createInstance } from "@shopware-pwa/shopware-6-client";
import { useUser, useCart, useSessionContext } from "@shopware-pwa/composables";

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
    contextToken,
    languageId,
  });

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
      });
      app.$cookies.set("sw-language-id", config.languageId, {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "Lax",
      });
    } catch (e) {
      // Sometimes cookie is set on server after request is send, it can fail silently
    }
  });

  const { refreshSessionContext } = useSessionContext(app);
  const { refreshUser } = useUser(app);
  const { refreshCart } = useCart(app);

  await Promise.all([refreshSessionContext(), refreshUser(), refreshCart()]);
};
