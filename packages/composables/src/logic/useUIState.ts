import { computed, ComputedRef, ref, Ref, unref } from "vue-demi";
import {
  useSharedState,
  getApplicationContext,
} from "@shopware-pwa/composables";

/**
 * Simple state management for UI purposes.
 *
 * @remarks
 * If you pase `stateName` on composable invocation (ex. `useUIState({stateName: 'sidebarCart'})`), then
 * state is shared between all instances with this key.
 * Otherwise state is local, so multiple `useUIState()` will not share state
 *
 * @example
 * ```ts
 * // Component1
 * const {isOpen, switchState} = useUIState({stateName: 'SIDEBAR_STATE'})
 * switchState()
 *
 * // Component 2
 * const {isOpen} = useUIState({stateName: 'SIDEBAR_STATE'})
 * // isOpen will be true
 * ```
 *
 * If you'll not use KEY on composable init, then state is only local
 *
 * ```ts
 * // Component1
 * const {isOpen, switchState} = useUIState()
 * switchState()
 *
 * // Component 2
 * const {isOpen} = useUIState()
 * // isOpen will be false
 * ```
 *
 * @beta
 */
export function useUIState(params?: { stateName?: Ref<string> | string }): {
  isOpen: ComputedRef<boolean>;
  switchState: (to?: boolean) => void;
} {
  const COMPOSABLE_NAME = "useUIState";
  const contextName = COMPOSABLE_NAME;

  const stateName = unref(params?.stateName);

  getApplicationContext({ contextName });
  const { sharedRef } = useSharedState();
  const _sharedState = sharedRef(`sw-${contextName}-${stateName}`);
  const localState: Ref<boolean> = ref(false);

  const isOpen = computed(() =>
    stateName ? !!_sharedState.value : !!localState.value
  );

  function switchState(to?: boolean) {
    if (stateName) {
      const stateToChange = to !== undefined ? !!to : !_sharedState.value;
      _sharedState.value = stateToChange;
    } else {
      const stateToChange = to !== undefined ? !!to : !localState.value;
      localState.value = stateToChange;
    }
  }

  return {
    isOpen,
    switchState,
  };
}
