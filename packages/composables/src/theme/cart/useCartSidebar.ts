import { computed } from "@vue/composition-api";
import { getStore } from "../..";

export const useCartSidebar = (): any => {
  let vuexStore = getStore();
  const isOpen = computed(() => vuexStore.getters.getIsCartSidebarOpen);

  function toggle() {
    vuexStore.commit("SET_CART_SIDEBAR_IS_OPEN", !isOpen.value);
  }

  return {
    isOpen,
    toggle
  };
};
