import Vue from "vue";
import { computed, reactive } from "@vue/composition-api";

const sharedCartSidebarState = Vue.observable({
  open: false,
} as any);

/**
 * @alpha
 */
export const useCartSidebar = (): any => {
  const localCartSidebarState = reactive(sharedCartSidebarState);
  const isSidebarOpen = computed(() => localCartSidebarState.open);

  function toggleSidebar() {
    sharedCartSidebarState.open = !sharedCartSidebarState.open;
  }

  return {
    isSidebarOpen,
    toggleSidebar,
  };
};
