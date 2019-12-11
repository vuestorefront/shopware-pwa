import Vue from "vue";
import VueCompositionApi, {
  computed,
  ref,
  Ref,
  reactive
} from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useCartSidebar, setStore } from "@shopware-pwa/composables";

describe("Composables - useCartSidebar", () => {
  const stateCartSidebarOpen: Ref<boolean> = ref(false);
  beforeEach(() => {
    // mock vuex store
    jest.resetAllMocks();
    stateCartSidebarOpen.value = false;
    setStore({
      getters: reactive({ 
        getIsCartSidebarOpen: computed(() => stateCartSidebarOpen.value)
      }),
      commit: (name: string, value: any) => {
        stateCartSidebarOpen.value = value;
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
      toggle();
      expect(isOpen.value).toBeTruthy();
    });
    
    it("should cart sidebar state toggle from false to true", () => {
      stateCartSidebarOpen.value = false;
      const { isOpen, toggle } = useCartSidebar();
      toggle();
      expect(isOpen.value).toBeTruthy();
    });

    it("should cart sidebar state toggle from true to false", () => {
      stateCartSidebarOpen.value = true;
      const { isOpen, toggle } = useCartSidebar();
      toggle();
      expect(isOpen.value).toBeFalsy();
    });
  });
});
