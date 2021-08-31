import {
  computed,
  onServerPrefetch,
  getCurrentInstance,
  Ref,
  ref,
  toRef,
  WritableComputedRef,
} from "vue-demi";
import { getApplicationContext } from "@shopware-pwa/composables";

const localSharedState: {
  [key: string]: Ref<any>;
} = {};

/**
 * Replacement for Vuex. Composable, which enables you to use shared state in your application.
 * State is shared both on server and client side.
 *
 * @public
 */
export function useSharedState() {
  const COMPOSABLE_NAME = "useSharedState";
  const contextName = COMPOSABLE_NAME;

  const { sharedStore, isServer } = getApplicationContext({ contextName });

  if (!sharedStore)
    throw new Error(
      `[${COMPOSABLE_NAME}] sharedStore is not injected into Vue instance`
    );

  /**
   * Extends Ref type to share it server->client and globally in client side.
   *
   * `uniqueKey` is used to identify value after sending it from the server.
   * You can use the same key to reach this value, but setting the same keys on different values will cause values override.
   *
   * @public
   */
  function sharedRef<T>(
    uniqueKey: string,
    defaultValue?: T
  ): WritableComputedRef<T | null> {
    if (!isServer && !localSharedState[uniqueKey]) {
      localSharedState[uniqueKey] = ref(sharedStore[uniqueKey]);
    }

    const sharedRef: Ref<T | null> = isServer
      ? toRef(sharedStore, uniqueKey)
      : localSharedState[uniqueKey];

    if (
      (sharedRef.value === null || typeof sharedRef.value === "undefined") &&
      defaultValue
    ) {
      sharedRef.value = defaultValue;
    }

    return computed({
      get: () => {
        return sharedRef.value ?? null;
      },
      set: (val) => {
        sharedRef.value = val;
      },
    });
  }

  /**
   * If provided Ref is empty we can preload its value on server/client side.
   *
   * You can use it to fetch data on server side, then store value inside `sharedRef`. This way data fetching will not be invoked again on client side.
   * But it will also be invoked on client side if the value was not previously set on server side.
   *
   * @example
   * ```
   * // use inside setup method
   * const { sharedRef, preloadRef } = useSharedState( root )
   * // create shared Ref value
   * const gitHubStarsCount = sharedRef('our-gh-stars')
   * // preload Ref value if it is empty
   * preloadRef(gitHubStarsCount, async () => {
   *   // call the API only once
   *   gitHubStarsCount.value = await getStarsFromAPI()
   * })
   * ```
   *
   * @alpha
   */
  async function preloadRef(
    refObject: Ref<unknown>,
    callback: () => Promise<void>
  ) {
    if (!refObject.value) {
      if (isServer && getCurrentInstance()) {
        onServerPrefetch(async () => {
          await callback();
        });
        return;
      }
      await callback();
    }
  }

  return {
    sharedRef,
    preloadRef,
  };
}
