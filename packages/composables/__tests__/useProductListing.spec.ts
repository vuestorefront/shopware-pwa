import Vue from "vue";
import VueCompositionApi, { ref, Ref } from "@vue/composition-api";
Vue.use(VueCompositionApi);

jest.mock("@shopware-pwa/shopware-6-client");
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
import {
  SearchFilterType,
  EqualsFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";

const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;
const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import { useProductListing } from "../src/hooks/useProductListing";

describe("Composables - useProductListing", () => {
  const categoryIdMock: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    categoryIdMock.value = "someCategory";

    mockedComposables.getApplicationContext.mockImplementation(() => {
      return {
        apiInstance: rootContextMock.$shopwareApiInstance,
        contextName: "useProductListing",
      } as any;
    });

    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: { limit: 10 },
        getIncludesConfig: jest.fn(),
        getAssociationsConfig: jest.fn(),
      } as any;
    });

    mockedComposables.useCms.mockImplementation(() => {
      return {
        categoryId: categoryIdMock,
      } as any;
    });

    mockedComposables.useCategoryFilters.mockImplementation(() => {
      return {
        activeSorting: ref(),
      } as any;
    });
  });

  it("should display deprecation info on invocation", () => {
    useProductListing(rootContextMock);
    expect(consoleWarnSpy).toBeCalledWith(
      '[DEPRECATED][@shopware-pwa/composables][useProductListing] This method has been deprecated. Use "useListing" instead.'
    );
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
    it("selectedFilters append selected filters with the max type filter", async () => {
      const { selectedFilters, toggleFilter, resetFilters } = useProductListing(
        rootContextMock
      );
      resetFilters();
      toggleFilter({
        type: SearchFilterType.MAX,
        field: "rating",
        max: 4,
      } as any);
      expect(selectedFilters.value).toStrictEqual({
        rating: {
          field: "rating",
          max: 4,
          type: SearchFilterType.MAX,
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
      mockedApiClient.getCategoryProductsListing.mockResolvedValue({} as any);
      const { loading, search } = useProductListing(rootContextMock, {
        elements: [{ product: "1" }],
      } as any);
      await search();
      expect(loading.value).toBe(false);
    });

    it("should throw an error when categoryId is not set", async () => {
      categoryIdMock.value = null;
      const { search } = useProductListing(rootContextMock, {
        elements: [{ product: "1" }],
      } as any);
      await expect(search()).rejects.toThrow(
        "[useProductListing][search] Search category id does not exist."
      );
    });

    it("should not make another call if previous request was basic", async () => {
      mockedApiClient.getCategoryProductsListing.mockResolvedValue({
        currentFilters: {
          rating: null,
          manufacturer: [],
          properties: [],
          "shipping-free": null,
        },
        aggregations: {
          manufacturer: {
            entities: [
              {
                name: "Divante",
                id: "12345",
                translated: {
                  name: "DivanteLtd",
                },
              },
            ],
          },
        },
      } as any);
      const { availableFilters, search } = useProductListing(
        rootContextMock,
        null as any
      );
      await search();
      expect(mockedApiClient.getCategoryProductsListing).toBeCalledTimes(1);
      expect(availableFilters.value).toStrictEqual([
        {
          name: "manufacturer",
          options: [
            {
              color: undefined,
              id: "12345",
              label: "DivanteLtd",
              name: "Divante",
              translated: { name: "DivanteLtd" },
              value: "12345",
            },
          ],
          type: "entity",
        },
      ]);
    });

    //
    it("should return default total and empty product listing when page resolver fails", async () => {
      mockedApiClient.getCategoryProductsListing.mockResolvedValueOnce(
        {} as any
      );

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
      mockedApiClient.getCategoryProductsListing.mockResolvedValue({
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
      categoryIdMock.value = "123456";
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
      mockedApiClient.getCategoryProductsListing.mockResolvedValue({} as any);
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

    describe("availableFilters", () => {
      it("should parse aggregations if the initial listing has any", () => {
        const { availableFilters } = useProductListing(rootContextMock, {
          aggregations: {
            manufacturer: {
              entities: [
                {
                  name: "Dicki, Gerhold and Witting",
                  translated: {
                    name: "Dicki, Gerhold and Witting",
                  },
                },
              ],
            },
          },
        } as any);

        expect(availableFilters.value).toStrictEqual([
          {
            name: "manufacturer",
            options: [
              {
                color: undefined,
                label: "Dicki, Gerhold and Witting",
                value: undefined,
                name: "Dicki, Gerhold and Witting",
                translated: {
                  name: "Dicki, Gerhold and Witting",
                },
              },
            ],
            type: "entity",
          },
        ]);
      });
      it("should make another call if the response is narrowed down", async () => {
        mockedApiClient.getCategoryProductsListing.mockResolvedValue({
          aggregations: {
            color: {
              elements: [],
            },
          },
          currentFilters: {
            manufacturer: [{ name: "shopware ag" }],
            properties: [{ name: "color" }],
          },
        } as any);

        const { availableFilters, search } = useProductListing(
          rootContextMock as any
        );
        await search();
        expect(mockedApiClient.getCategoryProductsListing).toBeCalledTimes(2);
        expect(availableFilters.value).toStrictEqual([]);
      });
    });
  });
});
