import Vue from "vue";
import { computed, reactive, ref, Ref } from "@vue/composition-api";
import { getApplicationContext } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";

const sharedUIState: any = {};

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
export const useUIState = (
  rootContext: ApplicationVueContext,
  stateName?: string
): { isOpen: Readonly<Ref<boolean>>; switchState: (to?: boolean) => void } => {
  getApplicationContext(rootContext, "useUIState");
  if (stateName && !sharedUIState[stateName]) {
    sharedUIState[stateName] = Vue.observable({ state: false } as any);
  }
  const localMappedState: { state: boolean } | undefined =
    stateName && reactive(sharedUIState[stateName]);
  const localState: Ref<boolean> = ref(false);

  const isOpen = computed(() => localMappedState?.state || localState.value);

  function switchState(to?: boolean) {
    if (stateName) {
      const stateToChange =
        to !== undefined ? !!to : !sharedUIState[stateName].state;
      sharedUIState[stateName].state = stateToChange;
    } else {
      const stateToChange = to !== undefined ? !!to : !localState.value;
      localState.value = stateToChange;
    }
  }

  return {
    isOpen,
    switchState,
  };
};
