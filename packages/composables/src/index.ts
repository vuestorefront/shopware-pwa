export * from "./hooks/useCms";
export * from "./hooks/useProduct";
export * from "./hooks/useCart";
export * from "./logic/useAddToCart";
export * from "./hooks/useCategoryFilters";
export * from "./hooks/useUser";

/**
 * Workaround for current reactivity problems with SSR for Nuxt.
 * This section will be removed after Vuex is no longer in use.
 */
let storeRef: any;
export function setStore(ref: any) {
  storeRef = ref;
}
export function getStore() {
  return storeRef;
}
