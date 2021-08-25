import { computed, ComputedRef, ref, Ref } from "vue-demi";
import {
  useSharedState,
  ApplicationVueContext,
  getApplicationContext,
} from "@shopware-pwa/composables";

/**
 * Simple state management for UI purposes.
 *
 * @remarks
 * If you pase `stateName` on composable invocation (ex. `useUIState(root, 'sidebarCart')`), then
 * state is shared between all instances with this key.
 * Otherwise state is local, so multiple `useUIState(root)` will not share state
 *
 * @example
 * ```ts
 * // Component1
 * const {isOpen, switchState} = useUIState(root, 'SIDEBAR_STATE')
 * switchState()
 *
 * // Component 2
 * const {isOpen} = useUIState(root, 'SIDEBAR_STATE')
 * // isOpen will be true
 * ```
 *
 * If you'll not use KEY on composable init, then state is only local
 *
 * ```ts
 * // Component1
 * const {isOpen, switchState} = useUIState(root)
 * switchState()
 *
 * // Component 2
 * const {isOpen} = useUIState(root)
 * // isOpen will be false
 * ```
 *
 * @beta
 */
export function useUIState(
  rootContext: ApplicationVueContext,
  stateName?: string
): { isOpen: ComputedRef<boolean>; switchState: (to?: boolean) => void } {
  getApplicationContext(rootContext, "useUIState");
  const { sharedRef } = useSharedState(rootContext);
  const _sharedState = sharedRef(`sw-useUIState-${stateName}`);
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
