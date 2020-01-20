import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useUserLoginModal } from "@shopware-pwa/composables";

describe("Composables - useUserLoginModal", () => {
  describe("computed", () => {
    describe("isModalOpen", () => {
      it("should be false when not set", () => {
        const { isModalOpen } = useUserLoginModal();
        expect(isModalOpen.value).toBeFalsy();
      });
    });
  });

  describe("methods", () => {
    describe("toggle", () => {
      it("should status change to true after first toggle", () => {
        const { isModalOpen, toggleModal } = useUserLoginModal();
        toggleModal();
        expect(isModalOpen.value).toBeTruthy();
      });
    });
  });
});
