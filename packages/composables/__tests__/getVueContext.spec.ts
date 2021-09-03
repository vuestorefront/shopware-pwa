import { extendScopeContext, useVueContext } from "@shopware-pwa/composables";
import vueComp from "vue-demi";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

describe("Shopware composables - getVueContext", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("useVueContext", () => {
    it("should return vue context indicators", () => {
      const context = useVueContext();
      expect(context).toEqual({ isVueComponent: false, isVueScope: false });
    });

    it("should indicate vue component", () => {
      mockedCompositionAPI.getCurrentInstance = jest
        .fn()
        .mockReturnValue({ proxy: {} });
      const { isVueComponent } = useVueContext();
      expect(isVueComponent).toBe(true);
    });
    it("should indicate vue scope", () => {
      mockedCompositionAPI.getCurrentScope = jest
        .fn()
        .mockReturnValue({ vm: {} });
      const { isVueScope } = useVueContext();
      expect(isVueScope).toBe(true);
    });
  });

  describe("extendScopeContext", () => {
    it("should extend scope context", () => {
      const result = {
        vm: {},
      };
      extendScopeContext(result, {});
      expect(result).toMatchSnapshot();
    });
  });
});
