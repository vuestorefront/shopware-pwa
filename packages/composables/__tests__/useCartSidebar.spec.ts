import Vue from "vue";
import VueCompositionApi, {
  reactive,
  computed,
} from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useCartSidebar, setStore } from "@shopware-pwa/composables";

describe("Composables - useCartSidebar", () => {
  let stateIsCartSidebarOpen = false;
  beforeEach(() => {
    // mock vuex store
    jest.resetAllMocks();
    stateIsCartSidebarOpen = false;
    setStore({
      getters: reactive({ getIsCartSidebarOpen: computed(() => stateIsCartSidebarOpen) }),
      commit: (name: string, value: any) => {
        console.log('state:' + value)
        stateIsCartSidebarOpen = value;
      }
    });
  });
  describe("cart sidebar", () => {
    it("should be false on page loaded", () => {
      const { isOpen } = useCartSidebar();
      expect(isOpen.value).toBeFalsy();
    });

    it("should status change to true after first toggle", () => {
      const { isOpen, toggle } = useCartSidebar();
      console.log(isOpen.value)
      toggle();
      console.log(isOpen.value)
      expect(isOpen.value).toBeTruthy();
    });

    it("should cart sidebar toggle from true to falsy", () => {
      stateIsCartSidebarOpen = true;
      const { isOpen, toggle } = useCartSidebar();
      toggle();
      expect(isOpen.value).toBeFalsy();
    });
  });
});