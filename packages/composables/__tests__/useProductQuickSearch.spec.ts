import { ref } from "vue-demi";
import { useProductQuickSearch } from "../src/logic/useProductQuickSearch";

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import * as ApiClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = ApiClient as jest.Mocked<typeof ApiClient>;

describe("Composables - useProductQuickSearch", () => {
  let returnedSearchMethod: any = null;
  const apiInstanceMock = jest.fn();
  const factorySearchMethodMock = jest.fn();
  const loadingMockRef = ref(false);

  beforeEach(() => {
    jest.resetAllMocks();
    returnedSearchMethod = null;
    loadingMockRef.value = false;
    mockedComposables.createListingComposable = jest
      .fn()
      .mockImplementation(({ searchMethod }) => {
        returnedSearchMethod = searchMethod;
        return {
          loading: loadingMockRef,
          search: factorySearchMethodMock,
        };
      });
    const getDefaultsMock = jest.fn().mockImplementation(() => {
      return { limit: 5 };
    });

    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: getDefaultsMock,
      } as any;
    });
    mockedComposables.getApplicationContext.mockImplementation(() => {
      return {
        apiInstance: apiInstanceMock,
      } as any;
    });
  });

  it("should have searchTerm ref", () => {
    const { searchTerm } = useProductQuickSearch();
    expect(searchTerm.value).toEqual("");
    searchTerm.value = "new search value";
    expect(searchTerm.value).toEqual("new search value");
  });

  it("should use listingKey - productQuickSearch", () => {
    useProductQuickSearch();
    expect(mockedComposables.createListingComposable).toBeCalledWith({
      listingKey: "productQuickSearch",
      searchDefaults: {
        limit: 5,
      },
      searchMethod: expect.any(Function),
    });
  });

  it("should invoke API search method", async () => {
    useProductQuickSearch();
    expect(mockedComposables.createListingComposable).toBeCalled();
    expect(returnedSearchMethod).toBeTruthy();
    await returnedSearchMethod({ limit: 8, query: "search term" });
    expect(mockedApiClient.searchSuggestedProducts).toBeCalledWith(
      { limit: 8, query: "search term" },
      apiInstanceMock
    );
  });

  it("should invoke search method inside createListingComposable with preventing route change", async () => {
    const { searchTerm, search } = useProductQuickSearch();
    searchTerm.value = "someTerm";
    await search();
    expect(factorySearchMethodMock).toBeCalledWith(
      { query: "someTerm" },
      { preventRouteChange: true }
    );
  });
});
