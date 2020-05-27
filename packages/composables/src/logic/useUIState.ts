import Vue from "vue";
import { computed, reactive, ref, Ref } from "@vue/composition-api";

const sharedUIState: any = {};

/**
 * Simple state management for UI purposes.
 * If you pase `stateName` on composable invocation (ex. `useUIState('sidebarCart')`), then
 * state is shared between all instances with this key.
 * Otherwise state is local, so multiple `useUIState()` will not share state
 *
 * @beta
 */
export const useUIState = (
  stateName?: string
): { isOpen: Readonly<Ref<boolean>>; toggleState: () => void } => {
  if (stateName && !sharedUIState[stateName]) {
    sharedUIState[stateName] = Vue.observable({ state: false } as any);
  }
  const localMappedState: { state: boolean } | undefined =
    stateName && reactive(sharedUIState[stateName]);
  const localState: Ref<boolean> = ref(false);

  const isOpen = computed(() => localMappedState?.state || localState.value);

  function toggleState() {
    if (stateName) {
      sharedUIState[stateName].state = !sharedUIState[stateName].state;
    } else {
      localState.value = !localState.value;
    }
  }

  return {
    isOpen,
    toggleState,
  };
};
