/**
 * @jest-environment jsdom
 */
import { Ref, ref } from "vue-demi";

import { createListingComposable } from "../src/factories/createListingComposable";

import { prepareRootContextMock } from "./contextRunner";

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import vueComp from "vue-demi";
const mockedCompositionAPI = vueComp as jest.Mocked<typeof vueComp>;

describe("Composables - createListingComposable", () => {
  const rootContextMock = prepareRootContextMock();
  const searchMethodMock = jest.fn();

  const mockedInitialListing: Ref<any> = ref(null);
  const mockedAppliedListing: Ref<any> = ref(null);

  let routerReplaceValue: any = null;
  let routerReplaceCatch: any = null;

  let cmsContextName = "";

  const routerMock = {
    replace: (param: any) => {
      routerReplaceValue = param;
      return {
        catch: (method: any) => (routerReplaceCatch = method),
      };
    },
    currentRoute: {
      query: {},
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
    mockedInitialListing.value = null;
    mockedAppliedListing.value = null;
    routerReplaceValue = null;
    routerMock.currentRoute.query = {};
    routerReplaceCatch = null;
    rootContextMock.router = routerMock;
    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: (contextName: string) => {
          cmsContextName = contextName;
          if (contextName.includes("initialListing"))
            return mockedInitialListing;
          if (contextName.includes("appliedListing"))
            return mockedAppliedListing;
        },
      } as any;
    });
    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });

  it("should use default cmsContext", () => {
    createListingComposable({} as any);
    expect(cmsContextName).not.toContain("createListingComposable(cms-");
  });

  it("should use defined cmsContext", () => {
    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: true,
      isVueScope: true,
    });
    mockedCompositionAPI.inject = jest
      .fn()
      .mockReturnValue("myInjectedContext");
    createListingComposable({} as any);
    expect(cmsContextName).toContain(
      "createListingComposable(cms-myInjectedContext)"
    );
  });

  it("should return composable with all values", () => {
    const resultComposable = createListingComposable({
      rootContext: rootContextMock as any,
      listingKey: "testKey",
      searchDefaults: { limit: 7 },
      searchMethod: searchMethodMock,
    });
    expect(resultComposable).toEqual({
      getInitialListing: expect.anything(),
      setInitialListing: expect.anything(),
      initSearch: expect.anything(),
      search: expect.anything(),
      getCurrentListing: expect.anything(),
      getElements: expect.anything(),
      getSortingOrders: expect.anything(),
      getCurrentSortingOrder: expect.anything(),
      changeCurrentSortingOrder: expect.anything(),
      getCurrentPage: expect.anything(),
      changeCurrentPage: expect.anything(),
      getTotal: expect.anything(),
      getTotalPagesCount: expect.anything(),
      getLimit: expect.anything(),
      getAvailableFilters: expect.anything(),
      getCurrentFilters: expect.anything(),
      loading: expect.anything(),
      loadMore: expect.anything(),
      loadingMore: expect.anything(),
    });
  });

  describe("getInitialListing", () => {
    it("should return null if key not found", () => {
      const { getInitialListing } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getInitialListing.value).toBeNull();
    });
    it("should return initialListing from store", () => {
      mockedInitialListing.value = { limit: 15 };
      const { getInitialListing } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getInitialListing.value).toEqual({ limit: 15 });
    });
  });

  describe("setInitialListing", () => {
    it("should change initial and applied listing", async () => {
      searchMethodMock.mockReturnValueOnce(() => {});
      const { setInitialListing } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await setInitialListing({ page: 5 });
      expect(mockedInitialListing.value).toEqual({ page: 5 });
      expect(mockedAppliedListing.value).toEqual(null);
    });
    it("should invoke set initial listing action with no aggregations if searchMethod's result is falsy", async () => {
      searchMethodMock.mockReturnValueOnce(undefined);
      const { setInitialListing } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await setInitialListing({
        currentFilters: {
          manufacturer: {},
        },
      } as any);
      expect(mockedInitialListing.value).toEqual({
        aggregations: undefined,
        currentFilters: {
          manufacturer: {},
        },
      });
    });
    it("should invoke searchMethod and change shared listing on invocation for initial and applied listing once currentFilters are not empty", async () => {
      searchMethodMock.mockReturnValueOnce(() => {
        aggregations: {
        }
      });
      const { setInitialListing } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await setInitialListing({
        currentFilters: {
          manufacturer: ["1234567"],
        },
      } as any);
      expect(searchMethodMock).toBeCalledWith({});
      expect(mockedInitialListing.value).toEqual({
        aggregations: undefined,
        currentFilters: {
          manufacturer: ["1234567"],
        },
      });
    });

    it("should invoke searchMethod for 2 times and change shared listing on invocation for initial and applied listing once currentFilters have applied filters", async () => {
      searchMethodMock.mockReturnValue({
        aggregations: {
          properties: ["12345"],
        },
      });
      const { search } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: {
          properties: "12221212122",
        },
        searchMethod: searchMethodMock,
      });
      await search({});
      expect(searchMethodMock).toBeCalledTimes(2);
      expect(mockedAppliedListing.value).toEqual({
        aggregations: {
          properties: ["12345"],
        },
      });
    });
    it("should invoke searchMethod for 2 times and change shared listing on invocation for initial and applied listing once currentFilters have applied filters", async () => {
      searchMethodMock.mockReturnValue(undefined);
      const { search } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: {
          properties: "12221212122",
        },
        searchMethod: searchMethodMock,
      });
      await search({});
      expect(searchMethodMock).toBeCalledTimes(2);
      expect(mockedAppliedListing.value).toEqual({ aggregations: {} });
    });
  });

  describe("getCurrentListing", () => {
    it("should return applied listing if exist", () => {
      mockedAppliedListing.value = { limit: 15 };
      const { getCurrentListing } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentListing.value).toEqual({
        limit: 15,
      });
    });

    it("should return initial listing if there is no applied one", () => {
      mockedInitialListing.value = {
        limit: 17,
      };
      const { getCurrentListing } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentListing.value).toEqual({
        limit: 17,
      });
    });
  });

  describe("getElements", () => {
    it("should return an empty array when there is no currentListing", () => {
      const { getElements } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getElements.value).toEqual([]);
    });

    it("should return elements from current listing", () => {
      mockedInitialListing.value = {
        elements: [1, 2, 3],
      };
      const { getElements } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getElements.value).toEqual([1, 2, 3]);
    });
  });

  describe("getTotal", () => {
    it("should return 0 when there is no currentListing", () => {
      const { getTotal } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getTotal.value).toEqual(0);
    });

    it("should return total from current listing", () => {
      mockedInitialListing.value = {
        total: 55,
      };
      const { getTotal } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getTotal.value).toEqual(55);
    });
  });

  describe("getLimit", () => {
    it("should return 10 when there is no configuration set", () => {
      const { getLimit } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getLimit.value).toEqual(10);
    });

    it("should return limit from search defaults when there is no listing", () => {
      const { getLimit } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: {
          limit: 4,
        },
        searchMethod: searchMethodMock,
      });
      expect(getLimit.value).toEqual(4);
    });

    it("should return limit from current listing", () => {
      mockedInitialListing.value = {
        limit: 2,
      };
      const { getLimit } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getLimit.value).toEqual(2);
    });
  });

  describe("getTotalPagesCount", () => {
    it("should return 0 when there is no currentListing", () => {
      const { getTotalPagesCount } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getTotalPagesCount.value).toEqual(0);
    });

    it("should return ceiled pages count from current listing", () => {
      mockedInitialListing.value = {
        total: 55,
      };
      const { getTotalPagesCount } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getTotalPagesCount.value).toEqual(6);
    });
  });

  describe("getSortingOrders", () => {
    it("should return empty object when there is no currentListing", () => {
      const { getSortingOrders } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getSortingOrders.value).toEqual([]);
    });

    it("should return availableSortings from currentListing", () => {
      mockedInitialListing.value = {
        availableSortings: [1, 2],
      };
      const { getSortingOrders } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getSortingOrders.value).toEqual([1, 2]);
    });

    it("should return olsSortings for shopware 6.3 configuration", () => {
      mockedInitialListing.value = {
        sortings: { key1: 1, key2: 2 },
      };
      const { getSortingOrders } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getSortingOrders.value).toEqual([1, 2]);
    });
  });

  describe("getCurrentSortingOrder", () => {
    it("should return null when there is no currentListing", () => {
      const { getCurrentSortingOrder } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentSortingOrder.value).toBeUndefined();
    });

    it("should return sorting order from current listing", () => {
      mockedInitialListing.value = {
        sorting: "name-asc",
      };
      const { getCurrentSortingOrder } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentSortingOrder.value).toEqual("name-asc");
    });
  });

  describe("changeCurrentSortingOrder", () => {
    it("should invoke search with changed order", async () => {
      const { changeCurrentSortingOrder } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await changeCurrentSortingOrder("my-new-order");
      expect(searchMethodMock).toBeCalledWith({ order: "my-new-order" });
      expect(routerReplaceValue).toEqual({ query: { order: "my-new-order" } });
    });

    it("should include router filters and override order value", async () => {
      routerMock.currentRoute.query = {
        manufacturer: "nike",
        order: "some-old-order",
      };
      const { changeCurrentSortingOrder } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await changeCurrentSortingOrder("my-new-order");
      expect(searchMethodMock).toBeCalledWith({
        order: "my-new-order",
        manufacturer: "nike",
      });
    });
  });

  describe("getCurrentPage", () => {
    it("should return 1 when there is no currentListing", () => {
      const { getCurrentPage } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentPage.value).toEqual(1);
    });

    it("should return page number from current listing", () => {
      mockedInitialListing.value = {
        page: 4,
      };
      const { getCurrentPage } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentPage.value).toEqual(4);
    });
  });

  describe("changeCurrentPage", () => {
    it("should invoke search with changed page number", async () => {
      const { changeCurrentPage } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await changeCurrentPage(6);
      expect(searchMethodMock).toBeCalledWith({ p: 6 });
      expect(routerReplaceValue).toEqual({ query: { p: 6 } });
    });

    it("should include router filters and override order value", async () => {
      routerMock.currentRoute.query = {
        manufacturer: "nike",
        p: 3,
      };
      const { changeCurrentPage } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await changeCurrentPage(7);
      expect(searchMethodMock).toBeCalledWith({
        p: 7,
        manufacturer: "nike",
      });
    });

    it("should invoke search with first page if argument not provided", async () => {
      const { changeCurrentPage } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await changeCurrentPage();
      expect(searchMethodMock).toBeCalledWith({ p: 1 });
      expect(routerReplaceValue).toEqual({ query: { p: 1 } });
    });
  });

  describe("getAvailableFilters", () => {
    it("should return an empty array when there is no currentListing", () => {
      const { getAvailableFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getAvailableFilters.value).toEqual([]);
    });

    it("should return elements from current listing", () => {
      mockedInitialListing.value = {
        aggregations: {
          myAggregation: {
            someValue: 1,
          },
        },
      };
      const { getAvailableFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getAvailableFilters.value).toEqual([
        {
          code: "myAggregation",
          label: "myAggregation",
          someValue: 1,
        },
      ]);
    });
  });

  describe("getCurrentFilters", () => {
    it("should return an empty object when there is no filters", () => {
      const { getCurrentFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentFilters.value).toEqual({});
    });

    it("should return combined filters from current listing and router query", () => {
      mockedInitialListing.value = {
        currentFilters: { limit: 6 },
      };
      routerMock.currentRoute.query = {
        manufacturer: "nike",
      };
      const { getCurrentFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentFilters.value).toEqual({
        limit: 6,
        manufacturer: "nike",
      });
    });

    it("should filter out empty values", () => {
      routerMock.currentRoute.query = {
        manufacturer: "nike",
        property: false,
      };
      const { getCurrentFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentFilters.value).toEqual({
        manufacturer: "nike",
      });
    });

    it("should filter out navigationId", () => {
      routerMock.currentRoute.query = {
        manufacturer: "nike",
        navigationId: "qwe",
      };
      const { getCurrentFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentFilters.value).toEqual({
        manufacturer: "nike",
      });
    });

    it("should handle priceFilter", () => {
      routerMock.currentRoute.query = {
        manufacturer: "nike",
        price: {
          min: 33,
          max: 34,
        },
      };
      const { getCurrentFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentFilters.value).toEqual({
        manufacturer: "nike",
        "min-price": 33,
        "max-price": 34,
      });
    });

    it("should handle priceFilter with only min value", () => {
      routerMock.currentRoute.query = {
        manufacturer: "nike",
        price: {
          min: 33,
        },
      };
      const { getCurrentFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentFilters.value).toEqual({
        manufacturer: "nike",
        "min-price": 33,
      });
    });

    it("should handle priceFilter with only max value", () => {
      routerMock.currentRoute.query = {
        manufacturer: "nike",
        price: {
          max: 33,
        },
      };
      const { getCurrentFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentFilters.value).toEqual({
        manufacturer: "nike",
        "max-price": 33,
      });
    });

    it("should filter out page number", () => {
      routerMock.currentRoute.query = {
        manufacturer: "nike",
        p: "3",
      };
      const { getCurrentFilters } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(getCurrentFilters.value).toEqual({
        manufacturer: "nike",
      });
    });
  });

  describe("initSearch", () => {
    it("should invoke search method", async () => {
      const { initSearch } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await initSearch({ limit: 7 });
      expect(searchMethodMock).toBeCalledWith({ limit: 7 });
    });

    it("should invoke setInitialListing after search", async () => {
      searchMethodMock.mockResolvedValueOnce({ limit: 77, currentFilters: {} });
      const { initSearch } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await initSearch({ limit: 7 });
      expect(mockedInitialListing.value).toEqual({
        currentFilters: {},
        limit: 77,
      });
    });

    it("should show loading on searching", (resolve) => {
      const { initSearch, loading } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(loading.value).toEqual(false);
      initSearch({ limit: 5 }).then(() => {
        expect(loading.value).toEqual(false);
        resolve();
      });
      expect(loading.value).toEqual(true);
    });

    it("should stop loading after throwing error", async () => {
      searchMethodMock.mockRejectedValueOnce(new Error("something's wrong"));
      const { initSearch, loading } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(loading.value).toEqual(false);
      await expect(initSearch({ limit: 5 })).rejects.toThrow(
        "something's wrong"
      );
      expect(loading.value).toEqual(false);
    });
  });

  describe("search", () => {
    it("should invoke search method", async () => {
      const { search } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await search({ limit: 7 });
      expect(searchMethodMock).toBeCalledWith({ limit: 7 });
    });

    it("should set applied listing after search", async () => {
      searchMethodMock.mockResolvedValueOnce({ limit: 77 });
      const { search } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await search({ limit: 7 });
      expect(mockedAppliedListing.value).toEqual({
        limit: 77,
        aggregations: {},
      });
    });

    it("should silently fail if router throws error", async () => {
      const { search } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await search({ limit: 7 });
      expect(routerReplaceCatch).toBeTruthy();
      routerReplaceCatch();
      expect(searchMethodMock).toBeCalledWith({ limit: 7 });
    });

    it("should by default change route with passed criteria", async () => {
      const { search } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await search({ limit: 7 });
      expect(routerReplaceValue).toEqual({ query: { limit: 7 } });
    });

    it("should change route when search options doesn't contains preventRouteChange flag", async () => {
      const { search } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await search({ limit: 7 }, {});
      expect(routerReplaceValue).toEqual({ query: { limit: 7 } });
    });

    it("should not change route when search options contains preventRouteChange flag", async () => {
      const { search } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await search({ limit: 7 }, { preventRouteChange: true });
      expect(routerReplaceValue).toBeNull();
    });

    it("should show loading on searching", (resolve) => {
      const { search, loading } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(loading.value).toEqual(false);
      search({ limit: 5 }).then(() => {
        expect(loading.value).toEqual(false);
        resolve();
      });
      expect(loading.value).toEqual(true);
    });

    it("should stop loading after throwing error", async () => {
      searchMethodMock.mockRejectedValueOnce(new Error("something's wrong"));
      const { search, loading } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(loading.value).toEqual(false);
      await expect(search({ limit: 5 })).rejects.toThrow("something's wrong");
      expect(loading.value).toEqual(false);
    });
  });

  describe("loadMore", () => {
    it("should invoke search method", async () => {
      searchMethodMock.mockResolvedValueOnce({
        page: 2,
        elements: [{ id: 1, name: "shoe" }],
      });
      const { loadMore } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await loadMore();
      expect(searchMethodMock).toBeCalledWith({ p: 2 });
    });

    it("should set applied listing after loadMore", async () => {
      searchMethodMock.mockResolvedValueOnce({
        page: 2,
        elements: [{ id: 1, name: "shoe" }],
      });
      const { loadMore } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await loadMore();
      expect(mockedAppliedListing.value).toEqual({
        page: 2,
        elements: [{ id: 1, name: "shoe" }],
      });
    });

    it("should show loading on searching", (resolve) => {
      searchMethodMock.mockResolvedValueOnce({
        page: 2,
        elements: [{ id: 1, name: "shoe" }],
      });
      const { loadMore, loadingMore } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(loadingMore.value).toEqual(false);
      loadMore().then(() => {
        expect(loadingMore.value).toEqual(false);
        resolve();
      });
      expect(loadingMore.value).toEqual(true);
    });

    it("should stop loading after throwing error", async () => {
      searchMethodMock.mockRejectedValueOnce(new Error("something's wrong"));
      const { loadMore, loadingMore } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      expect(loadingMore.value).toEqual(false);
      await expect(loadMore()).rejects.toThrow("something's wrong");
      expect(loadingMore.value).toEqual(false);
    });

    it("should merge loadMore result elements and override page number", async () => {
      mockedInitialListing.value = {
        page: 5,
        elements: [{ id: "333", name: "bag" }],
      };
      searchMethodMock.mockResolvedValueOnce({
        page: 7,
        elements: [{ id: 1, name: "shoe" }],
      });
      const { loadMore } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await loadMore();
      expect(searchMethodMock).toBeCalledWith({ p: 6 });
      expect(mockedAppliedListing.value).toEqual({
        page: 7,
        elements: [
          { id: "333", name: "bag" },
          { id: 1, name: "shoe" },
        ],
      });
    });

    it("should merge loadMore result elements", async () => {
      searchMethodMock.mockResolvedValueOnce({
        page: 7,
        elements: [{ id: 1, name: "shoe" }],
      });
      const { loadMore } = createListingComposable({
        rootContext: rootContextMock as any,
        listingKey: "testKey",
        searchDefaults: null as any,
        searchMethod: searchMethodMock,
      });
      await loadMore();
      expect(searchMethodMock).toBeCalledWith({ p: 2 });
      expect(mockedAppliedListing.value).toEqual({
        page: 7,
        elements: [{ id: 1, name: "shoe" }],
      });
    });
  });
});
