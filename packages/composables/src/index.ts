/**
 * Vue's composables to be used in Shopware frontend application.
 *
 * @packageDocumentation
 */

import { App, markRaw, effectScope, reactive } from "vue-demi";

export * from "./hooks/useCms";
export * from "./hooks/useProduct";
export * from "./hooks/useCart";
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
export * from "./logic/useSharedState";
export * from "./logic/useOrderDetails";
export * from "./getVueContext";
export {
  getApplicationContext,
  ShopwareDomain,
  SwRouting,
  SwInterceptors,
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
    initialStore: any;
    shopwareDefaults: any;
    apiInstance: any;
  }
) {
  const scope = effectScope(true);
  const state = scope.run(() => {
    return reactive({
      interceptors: {},
      sharedStore: options.initialStore || reactive({}),
      shopwareDefaults: options.shopwareDefaults,
    });
  });

  const shopwarePlugin = markRaw({
    // install(app: App) {
    //   // TODO: make it work for Vue 3
    //   // if (!isVue2) {
    //   //   shopwarePlugin._a = app;
    //   //   app.provide(shopwareSymbol, shopwarePlugin);
    //   //   app.config.globalProperties.$shopware = shopwarePlugin;
    //   //   /* istanbul ignore else */
    //   //   // if (__DEV__ && IS_CLIENT) {
    //   //   if (typeof window !== "undefined") {
    //   //     registerShopwareDevtools(app, state);
    //   //   }
    //   // }
    // },
    _a: app,
    _e: scope,
    apiInstance: options.apiInstance,
    state,
  });

  return shopwarePlugin;
}
