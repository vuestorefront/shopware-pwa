export * from "./hooks/useCms";
export * from "./hooks/useProduct";
export * from "./hooks/useCart";
export * from "./logic/useAddToCart";
export * from "./hooks/useCategoryFilters";
export * from "./hooks/useUser";
export * from "./hooks/useProductListing";
export * from "./theme/cart/useCartSidebar";

/**
 * Workaround for current reactivity problems with SSR for Nuxt.
 * This section will be removed after Vuex is no longer in use.
 */
let storeRef: any;

/**
 * @alpha
 */
export function setStore(ref: any) {
  storeRef = ref;
}
/**
 * @alpha
 */
export function getStore() {
  return storeRef;
}
