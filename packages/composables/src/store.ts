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
