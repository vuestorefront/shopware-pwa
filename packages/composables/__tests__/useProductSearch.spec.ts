import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useProductSearch } from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/shopware-6-client");
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
import { SearchFilterType } from "@shopware-pwa/commons/interfaces/search/SearchFilter";
const mockedApi = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useProductSearch", () => {
  console.error = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("initial values", () => {
    it("should have no listing result if search wasn't performed", async () => {
      const { searchResult } = useProductSearch();
      expect(searchResult.value).toBeNull();
    });
    it("should have loading value set to false by default", async () => {
      const { loadingSearch } = useProductSearch();
      expect(loadingSearch.value).toBeFalsy();
    });
  });
  describe("currentPagination", () => {
    it("should have proper values under the pagination property", async () => {
      mockedApi.getSearchResults.mockResolvedValueOnce({
        page: 4,
        limit: 10,
        total: 189,
      } as any);
      const { search, currentPagination } = useProductSearch();
      await search("some term");
      expect(currentPagination.value).toStrictEqual({
        currentPage: 4,
        perPage: 10,
        total: 189,
      });
    });
  });
  describe("currentSearchTerm", () => {
    it("should have current search-term if there is one provided during the search", async () => {
      const { search, currentSearchTerm } = useProductSearch();
      await search("some term");
      expect(currentSearchTerm.value).toBe("some term");
    });
  });
  describe("suggestSearch", () => {
    it("should have appriopriate API call invoked on search action", async () => {
      const { suggestSearch, suggestionsResult } = useProductSearch();
      await suggestSearch("some string");
      expect(mockedApi.getSuggestedResults).toBeCalledTimes(1);
      expect(mockedApi.getSuggestedResults).toBeCalledWith("some string");
      expect(suggestionsResult.value).toBeUndefined();
    });
    it("should catch and log the error on api call rejection", async () => {
      const { suggestSearch } = useProductSearch();
      mockedApi.getSuggestedResults.mockRejectedValueOnce({
        message: "Something went wrong",
      } as any);

      await suggestSearch("lucky search");
    });
  });
  describe("search", () => {
    it("should set available filters if it's a base search with aggregations for whole collection", async () => {
      mockedApi.getSearchResults.mockResolvedValueOnce({
        page: 4,
        limit: 10,
        total: 189,
        aggregations: {
          manufacturer: {
            entities: [
              {
                translated: {
                  name: "DivanteLtd",
                },
                id: "123456",
              },
            ],
          },
        },
      } as any);
      const { search, availableFilters } = useProductSearch();
      await search("some string");
      expect(availableFilters.value).toStrictEqual([
        {
          name: "manufacturer",
          options: [
            {
              color: false,
              label: "DivanteLtd",
              value: "123456",
            },
          ],
          type: "entity",
        },
      ]);
    });
    it("should have appriopriate API call invoked on search action", async () => {
      const { search } = useProductSearch();
      await search("some string");
      expect(mockedApi.getSearchResults).toBeCalledTimes(1);
      expect(mockedApi.getSearchResults).toBeCalledWith("some string", {});
    });
    it("should have product returned if search term provided", async () => {
      mockedApi.getSearchResults.mockResolvedValueOnce({
        data: [{ name: "some string" }],
      } as any);
      const { search, searchResult } = useProductSearch();
      await search("some string");
      expect(searchResult.value).toStrictEqual({
        data: [{ name: "some string" }],
      });
    });
    it("should not perform search without any term provided", async () => {
      const { search, searchResult } = useProductSearch();
      await search(undefined as any);
      expect(mockedApi.getSearchResults).toBeCalledTimes(0);
      expect(searchResult.value).toStrictEqual(null);
    });
    it("should have error on rejection from API client", async () => {
      mockedApi.getSearchResults.mockRejectedValueOnce({
        message: "Something went wrong",
      } as any);

      const { search, searchResult } = useProductSearch();
      try {
        await search("test");
      } catch (e) {
        expect(e).toStrictEqual({ message: "Something went wrong" });
      }

      expect(mockedApi.getSearchResults).toBeCalledTimes(1);
      expect(searchResult.value).toStrictEqual(null);
    });
  });
  describe("changePage", () => {
    it("should append the provided page to the pagination object", async () => {
      const { search, changePage } = useProductSearch();
      await search("test");
      await changePage(5);
      expect(mockedApi.getSearchResults).toBeCalledWith("test", {
        pagination: { limit: undefined, page: 5 },
      });
      expect(mockedApi.getSearchResults).toBeCalledTimes(2);
    });
  });
  describe("changeSorting", () => {
    it("should invoke getSearchResults with provided sorting config", async () => {
      const { search, changeSorting } = useProductSearch();
      await search("test");
      await changeSorting({
        field: "name",
        name: "name-desc",
        desc: true,
      });
      expect(mockedApi.getSearchResults).toBeCalledWith("test", {
        sort: {
          desc: true,
          field: "name",
          name: "name-desc",
        },
      });
      expect(mockedApi.getSearchResults).toBeCalledTimes(2);
    });
    it("should not invoke getSearchResults if no sorting was provided", async () => {
      const { search, changeSorting } = useProductSearch();
      await search("test");
      await changeSorting(undefined as any);
      expect(mockedApi.getSearchResults).toBeCalledTimes(1);
    });
  });
  describe("toggleFilter", () => {
    it("should not set the filters array to selectedCriteria if selectedFilterBucket is empty", async () => {
      const { toggleFilter, search, resetFilters } = useProductSearch();
      resetFilters();
      toggleFilter(
        {
          field: "aaaaaaa",
          value: undefined,
        } as any,
        false
      );
      await search("some term");

      expect(mockedApi.getSearchResults).toBeCalledWith("some term", {});
    });
    it("should not select filter if it has wrong format", () => {
      const { toggleFilter, selectedFilters } = useProductSearch();
      toggleFilter(undefined as any, false);
      expect(selectedFilters.value).toStrictEqual({});
    });
    it("should trigger ToggleSelectedFilter on toggleFilter run", () => {
      const { toggleFilter, selectedFilters } = useProductSearch();
      toggleFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "white",
          field: "color",
        },
        false
      );
      expect(selectedFilters.value).toStrictEqual({ color: ["white"] });
    });
    it("should call getSearchResults with transformed filters if any provided", async () => {
      const { toggleFilter, search } = useProductSearch();
      toggleFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "white",
          field: "color",
        },
        false
      );
      await search("t-shirt");
      expect(mockedApi.getSearchResults).toBeCalledTimes(1);
      expect(mockedApi.getSearchResults).toBeCalledWith("t-shirt", {
        filters: [
          {
            operator: "OR",
            queries: [
              { field: "propertyIds", type: "equalsAny", value: ["white"] },
              { field: "optionIds", type: "equalsAny", value: ["white"] },
            ],
            type: "multi",
          },
        ],
      });
    });
  });
  describe("resetFilters", () => {
    it("should removed all filters from selectedFilters computed property", () => {
      const {
        toggleFilter,
        selectedFilters,
        resetFilters,
      } = useProductSearch();
      toggleFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "white",
          field: "color",
        },
        false
      );
      expect(selectedFilters.value).toHaveProperty("color");
      resetFilters();
      expect(selectedFilters.value).not.toHaveProperty("color");
    });
  });
});
