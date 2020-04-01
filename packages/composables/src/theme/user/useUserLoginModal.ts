import Vue from "vue";
import { computed, reactive } from "@vue/composition-api";

const sharedUserLoginModalState = Vue.observable({
  open: false,
} as any);

/**
 * @alpha
 */
export const useUserLoginModal = (): any => {
  const localUserLoginModal = reactive(sharedUserLoginModalState);
  const isModalOpen = computed(() => localUserLoginModal.open);

  const toggleModal = () => {
    localUserLoginModal.open = !localUserLoginModal.open;
  };

  return {
    isModalOpen,
    toggleModal,
  };
};
