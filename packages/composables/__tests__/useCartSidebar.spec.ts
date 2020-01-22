import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useCartSidebar } from "@shopware-pwa/composables";

describe("Composables - useCartSidebar", () => {
  describe("computed", () => {
    describe("isSidebarOpen", () => {
      it("should be false when not set", () => {
        const { isSidebarOpen } = useCartSidebar();
        expect(isSidebarOpen.value).toBeFalsy();
      });
    });
  });

  describe("methods", () => {
    describe("toggle", () => {
      it("should status change to true after first toggle", () => {
        const { isSidebarOpen, toggleSidebar } = useCartSidebar();
        toggleSidebar();
        expect(isSidebarOpen.value).toBeTruthy();
      });
    });
  });
});
