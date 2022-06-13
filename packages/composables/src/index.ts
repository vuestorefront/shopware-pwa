/**
 * Vue's composables to be used in Shopware frontend application.
 *
 * @packageDocumentation
 */

import { ApiDefaults } from "@shopware-pwa/commons";
import { ShopwareApiInstance } from "@shopware-pwa/shopware-6-client";
import {
  App,
  markRaw,
  effectScope,
  EffectScope,
  reactive,
  isVue2,
} from "vue-demi";
import { registerShopwareDevtools } from "./devtools/plugin";

export * from "./hooks/useCms";
export * from "./hooks/useProduct";
export * from "./hooks/useCart";
export * from "./logic/useCartItem";
export * from "./logic/useAddToCart";
export * from "./logic/useCheckout";
export * from "./logic/useSessionContext";
export * from "./logic/useUIState";
export * from "./hooks/useCurrency";
export * from "./hooks/useNavigation";
export * from "./hooks/useSalutations";
export * from "./hooks/useCountries";
export * from "./hooks/useUser";
export * from "./hooks/useCustomerOrders";
export * from "./hooks/useCustomerPassword";
export * from "./hooks/useCustomerAddresses";
export * from "./logic/useDefaults";
export * from "./logic/useNotifications";
export * from "./logic/useIntercept";
export * from "./getDefaultApiParams";
export * from "./logic/useListing";
export * from "./logic/useProductQuickSearch";
export * from "./factories/createListingComposable";
export * from "./logic/useWishlist";
export * from "./hooks/useCountry";
export * from "./logic/useProductConfigurator";
export * from "./logic/useBreadcrumbs";
export * from "./logic/useProductAssociations";
export * from "./logic/useProductReviews";
export * from "./logic/useSharedState";
export * from "./logic/useOrderDetails";
export * from "./getVueContext";
export {
  getApplicationContext,
  ShopwareDomain,
  SwRouting,
  SwInterceptors,
  SwInterceptor,
} from "./appContext";

export { ShopwareVuePlugin } from "./devtools/vue2";

/* istanbul ignore next */
/**
 * Create ShopwarePlugin vue instance. Shpware PWA composables rely on this config.
 *
 * @beta
 */
export function createShopware(
  app: App,
  options: {
    initialStore?: any;
    shopwareDefaults: ApiDefaults;
    apiInstance: ShopwareApiInstance;
    enableDevtools?: boolean;
  }
) {
  const scope: EffectScope = effectScope(true);
  const state = scope.run(() => {
    return reactive({
      interceptors: {},
      sharedStore: options.initialStore || reactive({}),
      shopwareDefaults: options.shopwareDefaults || {},
    });
  });

  const shopwarePlugin = markRaw({
    install(
      app: App,
      options?: {
        enableDevtools: boolean;
      }
    ) {
      if (!isVue2) {
        shopwarePlugin._a = app;
        (app as any).config.globalProperties.$shopware = shopwarePlugin;
        (app as any).provide("shopware", shopwarePlugin);
        /* istanbul ignore else */
        if (options?.enableDevtools && typeof window !== "undefined") {
          registerShopwareDevtools(app, shopwarePlugin);
        }
      }
    },
    _a: app,
    _e: scope,
    apiInstance: options.apiInstance,
    state,
  });

  if (!isVue2 && options?.enableDevtools && typeof window !== "undefined") {
    registerShopwareDevtools(app, shopwarePlugin);
  }
  return shopwarePlugin;
}
