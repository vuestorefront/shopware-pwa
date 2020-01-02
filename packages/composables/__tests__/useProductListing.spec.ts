import Vue from "vue";
import VueCompositionApi, {
  reactive,
  ref,
  computed,
  Ref
} from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useProductListing, setStore } from "@shopware-pwa/composables";

 import { SearchFilterType, EqualsFilter, EqualsAnyFilter } from "@shopware-pwa/shopware-6-client";

// jest.mock("@shopware-pwa/shopware-6-client");
// const mockedGetProduct = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useProductListing", () => {
  const statePage: Ref<Object | null> = ref(null);
  //const { resetFilters } = useProductListing()

  beforeEach(() => {
    jest.resetAllMocks();
    //resetFilters();
    statePage.value = null;
    setStore({
      getters: reactive({ getPage: computed(() => statePage.value) }),
      commit: (name: string, value: any) => {
        statePage.value = value;
      }
    });
  });
  describe("no reference to the products collection", () => {
    it("should have no value if search wasn't performed", async () => {
      const { products } = useProductListing()
      expect(products.value).toHaveLength(0)
    });
    it("should have empty array if no products passed", async () => {
      const { products } = useProductListing([])
      expect(products.value).toHaveLength(0)
    });
  });

  describe("toggleFilter", () => {
    it("selectedFilters should not contain any filter on init", async () => {
      const { selectedFilters } = useProductListing()
      expect(selectedFilters.value).toStrictEqual({})
    });

    it("selectedFilters should be filled with passed one", async () => {
      const { selectedFilters, toggleFilter } = useProductListing()
      toggleFilter({
        type: SearchFilterType.EQUALS,
        value: "white",
        field: "color"
      } as EqualsFilter)

      expect(selectedFilters.value).toHaveProperty("color")
    });

    it("selectedFilters should append the existing one", async () => {
      const { selectedFilters, toggleFilter, resetFilters } = useProductListing()
      resetFilters();

      toggleFilter({
        type: SearchFilterType.EQUALS_ANY,
        value: ["white","black"],
        field: "color"
      } as EqualsAnyFilter)

      expect(selectedFilters.value).toHaveProperty("color")
      console.warn(selectedFilters.value.color)
    });
  });

  

  

  
});
