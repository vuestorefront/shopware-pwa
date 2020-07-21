import Vue from "vue";
import VueCompositionApi, {
  reactive,
  ref,
  computed,
  Ref,
} from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useProductListing } from "@shopware-pwa/composables";

jest.mock("@shopware-pwa/shopware-6-client");
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
import {
  SearchFilterType,
  EqualsFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";

const mockedGetPage = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useProductListing", () => {
  const statePage: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    $store: {
      getters: reactive({ getPage: computed(() => statePage.value) }),
      commit: (name: string, value: any) => {
        statePage.value = value;
      },
    },
    $shopwareApiInstance: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    statePage.value = null;
  });
  describe("no reference to the products collection", () => {
    it("should have no value if search wasn't performed", async () => {
      const { products } = useProductListing(rootContextMock);
      expect(products.value).toHaveLength(0);
    });
    it("should have empty array if no products passed", async () => {
      const { products } = useProductListing(rootContextMock, {
        elements: [],
      } as any);
      expect(products.value).toHaveLength(0);
    });
  });

  describe("toggleFilter", () => {
    it("selectedFilters should not contain any filter on init", async () => {
      const { selectedFilters } = useProductListing(rootContextMock);
      expect(selectedFilters.value).toStrictEqual({});
    });

    it("selectedFilters should not contain any filter if provided one is not a valid object", async () => {
      const { selectedFilters, toggleFilter } = useProductListing(
        rootContextMock
      );
      toggleFilter(undefined as any);
      expect(selectedFilters.value).toStrictEqual({});
    });

    it("selectedFilters append selected filters with the range type filter", async () => {
      const { selectedFilters, toggleFilter } = useProductListing(
        rootContextMock
      );
      toggleFilter({
        type: SearchFilterType.RANGE,
        field: "price",
        parameters: {
          gt: 10,
          lt: 15,
        },
      } as any);
      expect(selectedFilters.value).toStrictEqual({
        price: {
          gt: 10,
          lt: 15,
        },
      });
    });

    it("selectedFilters should be filled with passed one", async () => {
      const { selectedEntityFilters, toggleFilter } = useProductListing(
        rootContextMock
      );
      toggleFilter({
        type: SearchFilterType.EQUALS,
        value: "white",
        field: "color",
      } as EqualsFilter);

      expect(selectedEntityFilters.value).toStrictEqual(["white"]);
    });

    it("selectedFilters should remove the existing one if toggled", async () => {
      const {
        selectedEntityFilters,
        toggleFilter,
        resetFilters,
      } = useProductListing(rootContextMock);
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

      expect(selectedEntityFilters.value).toStrictEqual([]);
    });

    it("selectedFilters should append the filters array on force", async () => {
      const {
        selectedEntityFilters,
        toggleFilter,
        resetFilters,
      } = useProductListing(rootContextMock);
      resetFilters();

      toggleFilter({
        type: SearchFilterType.EQUALS,
        value: "white",
        field: "color",
      } as EqualsFilter);

      toggleFilter({
        type: SearchFilterType.EQUALS,
        value: "black",
        field: "color",
      } as EqualsFilter),
        true;

      expect(selectedEntityFilters.value).toStrictEqual(["white", "black"]);
    });
  });

  describe("search", () => {
    it("should reset search criteria on category change event", async () => {
      const { products, selectedFilters } = useProductListing(rootContextMock, {
        elements: [{ product: "1" }],
      } as any);
      expect(selectedFilters.value).toStrictEqual({});

      expect(products.value).toHaveLength(1);
    });

    it("should set loading property to false when search is done", async () => {
      const { loading, search } = useProductListing(rootContextMock, {
        elements: [{ product: "1" }],
      } as any);
      await search();
      expect(loading.value).toBe(false);
    });

    //
    it("should return default total and empty product listing when page resolver fails", async () => {
      mockedGetPage.getCategoryProductsListing.mockResolvedValueOnce({} as any);

      const { products, search, pagination } = useProductListing(
        rootContextMock
      );
      search();
      expect(pagination.value).toStrictEqual({
        currentPage: 1,
        perPage: 10,
        total: 0,
      });
      expect(products.value).toStrictEqual([]);
    });

    it("should return products if exist", async () => {
      mockedGetPage.getCategoryProductsListing.mockResolvedValueOnce({
        elements: [
          {
            id: "123456",
          },
        ],
      } as any);

      const { products, search } = useProductListing(rootContextMock);
      await search();
      expect(products.value).toStrictEqual([{ id: "123456" }]);
    });

    it("should search with no categoryId passed by page resolver", async () => {
      statePage.value = {
        resourceIdentifier: "123456",
      };
      const { categoryId } = useProductListing(rootContextMock);

      expect(categoryId.value).toStrictEqual("123456");
    });
  });

  describe("changeSorting", () => {
    it("should perform no search if no sorting provided", async () => {
      const { changeSorting, selectedSorting } = useProductListing(
        rootContextMock
      );
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
      const { pagination, changePagination } = useProductListing(
        rootContextMock
      );

      await changePagination(undefined as any);
      expect(pagination.value).toStrictEqual({
        currentPage: 1,
        perPage: 10,
        total: 0,
      });
    });

    it("should not change pagination state to privided one once a useProductListing argument is passed hasn't any required fields", async () => {
      const { pagination } = useProductListing(rootContextMock, {
        page: undefined,
      } as any);

      expect(pagination.value).toStrictEqual({
        currentPage: 1,
        perPage: 10,
        total: 0,
      });
    });

    it("should not change pagination state to privided one once a useProductListing argument is passed has no pagination data", async () => {
      const { pagination } = useProductListing(
        rootContextMock,
        undefined as any
      );

      expect(pagination.value).toStrictEqual({
        currentPage: 1,
        perPage: 10,
        total: 0,
      });
    });

    it("should change pagination state to privided one as a useProductListing argument is passed", async () => {
      const { pagination } = useProductListing(rootContextMock, {
        total: 6,
        page: 2,
        limit: 10,
        elements: [{ id: "123456" }],
      } as any);

      expect(pagination.value).toStrictEqual({
        currentPage: 2,
        perPage: 10,
        total: 6,
      });
    });

    it("should perform change the shared pagination object if change succeeds", async () => {
      const { pagination, changePagination } = useProductListing(
        rootContextMock
      );

      await changePagination(10);
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
        const { productsTotal } = useProductListing(rootContextMock);
        expect(productsTotal.value).toBeFalsy();
      });
    });
  });
});
