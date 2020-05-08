import Vue from "vue";
import VueCompositionApi, {
  reactive,
  ref,
  computed,
  Ref,
} from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useProductListing, setStore } from "@shopware-pwa/composables";

jest.mock("@shopware-pwa/shopware-6-client");
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
import {
  SearchFilterType,
  EqualsFilter,
  EqualsAnyFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";

const mockedGetPage = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useProductListing", () => {
  const statePage: Ref<Object | null> = ref(null);

  beforeEach(() => {
    jest.resetAllMocks();
    statePage.value = null;
    setStore({
      getters: reactive({ getPage: computed(() => statePage.value) }),
      commit: (name: string, value: any) => {
        statePage.value = value;
      },
    });
  });
  describe("no reference to the products collection", () => {
    it("should have no value if search wasn't performed", async () => {
      const { products } = useProductListing();
      expect(products.value).toHaveLength(0);
    });
    it("should have empty array if no products passed", async () => {
      const { products } = useProductListing([]);
      expect(products.value).toHaveLength(0);
    });
  });

  describe("toggleFilter", () => {
    it("selectedFilters should not contain any filter on init", async () => {
      const { selectedFilters } = useProductListing();
      expect(selectedFilters.value).toStrictEqual({});
    });

    it("selectedFilters should be filled with passed one", async () => {
      const { selectedFilters, toggleFilter } = useProductListing();
      toggleFilter({
        type: SearchFilterType.EQUALS,
        value: "white",
        field: "color",
      } as EqualsFilter);

      expect(selectedFilters.value).toHaveProperty("color");
    });

    it("selectedFilters should append the existing one", async () => {
      const {
        selectedFilters,
        toggleFilter,
        resetFilters,
      } = useProductListing();
      resetFilters();

      toggleFilter({
        type: SearchFilterType.EQUALS_ANY,
        value: ["white", "black"],
        field: "color",
      } as EqualsAnyFilter);

      expect(selectedFilters.value).toHaveProperty("color");
    });

    it("selectedFilters should remove the existing one if toggled", async () => {
      const {
        selectedFilters,
        toggleFilter,
        resetFilters,
      } = useProductListing();
      resetFilters();

      toggleFilter({
        type: SearchFilterType.EQUALS,
        value: "white",
        field: "color",
      } as EqualsFilter);

      toggleFilter({
        type: SearchFilterType.EQUALS,
        value: "white",
        field: "color",
      } as EqualsFilter);

      expect(selectedFilters.value).toHaveProperty("color");
      expect(selectedFilters.value.color).toStrictEqual([]);
    });
  });

  describe("search", () => {
    it("should reset search criteria on category change event", async () => {
      const { products, selectedFilters } = useProductListing([
        { product: "1" } as any,
      ]);
      expect(selectedFilters.value).toStrictEqual({});

      expect(products.value).toHaveLength(1);
    });

    it("should set loading property to false when search is done", async () => {
      const { loading, search } = useProductListing([{ product: "1" } as any]);
      await search();
      expect(loading.value).toBe(false);
    });

    //
    it("should return default total and empty product listing when page resolver fails", async () => {
      mockedGetPage.getProducts.mockResolvedValueOnce({} as any);

      const { pagination, products, search } = useProductListing();
      await search();
      expect(pagination.value).toStrictEqual({
        currentPage: 1,
        perPage: 10,
        total: 0,
      });
      expect(products.value).toStrictEqual([]);
    });

    it("should return products if exist", async () => {
      mockedGetPage.getProducts.mockResolvedValueOnce({
        data: [
          {
            id: "123456",
          },
        ],
      } as any);

      const { products, search } = useProductListing();
      await search();
      expect(products.value).toStrictEqual([{ id: "123456" }]);
    });

    it("should search with no categoryId passed by page resolver", async () => {
      statePage.value = {
        resourceIdentifier: "123456",
      };
      const { categoryId } = useProductListing();

      expect(categoryId.value).toStrictEqual("123456");
    });
  });

  describe("changeSorting", () => {
    it("should perform no search if no sorting provided", async () => {
      const { changeSorting, selectedSorting } = useProductListing();
      await changeSorting({
        field: "price",
        desc: false,
      });
      await changeSorting(undefined as any);

      expect(selectedSorting.value).toStrictEqual({
        desc: false,
        field: "price",
      });
    });
  });

  describe("changePagination", () => {
    it("should perform no search and leave default pagination if no change performed", async () => {
      const { pagination, changePagination } = useProductListing();

      changePagination(undefined as any);
      expect(pagination.value).toStrictEqual({
        currentPage: 1,
        perPage: 10,
        total: 0,
      });
    });

    it("should perform change the shared pagination object if change succeeds", async () => {
      const { pagination, changePagination } = useProductListing();

      changePagination(10);
      expect(pagination.value).toStrictEqual({
        currentPage: 10,
        perPage: 10,
        total: 0,
      });
    });
  });

  describe("computed", () => {
    describe("productsTotal", () => {
      it("should return 0 by default", () => {
        const { productsTotal } = useProductListing();
        expect(productsTotal.value).toBeFalsy();
      });
    });
  });
});
