import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useUIState } from "@shopware-pwa/composables";

describe("Composables - useUIState", () => {
  describe("local state", () => {
    it("should have isOpen state false by default", () => {
      const { isOpen } = useUIState();
      expect(isOpen.value).toEqual(false);
    });

    it("should change UI state", () => {
      const { isOpen, toggleState } = useUIState();
      toggleState();
      expect(isOpen.value).toEqual(true);
    });

    it("should change only local state", () => {
      const { isOpen, toggleState } = useUIState();
      const { isOpen: isOpen2 } = useUIState();
      toggleState();
      expect(isOpen.value).toEqual(true);
      expect(isOpen2.value).toEqual(false);
    });
  });

  describe("shared state", () => {
    it("should have isOpen state false by default", () => {
      const { isOpen } = useUIState("some-test-key");
      expect(isOpen.value).toEqual(false);
    });

    it("should change UI state in multiple instances", () => {
      const { isOpen, toggleState } = useUIState("some-test-key2");
      const { isOpen: isOpen2 } = useUIState("some-test-key2");
      expect(isOpen.value).toEqual(false);
      toggleState();
      expect(isOpen.value).toEqual(true);
      expect(isOpen2.value).toEqual(true);
    });
  });
});
