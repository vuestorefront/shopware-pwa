import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useProductSearch } from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/shopware-6-client");
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
const mockedApi = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useProductSearch", () => {
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
      mockedApi.getResults.mockResolvedValueOnce({
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
    it("should have appriopriate API call invoked on search action", async () => {
      const { search } = useProductSearch();
      await search("some string");
      expect(mockedApi.getResults).toBeCalledTimes(1);
      expect(mockedApi.getResults).toBeCalledWith("some string", {});
    });
    it("should have product returned if search term provided", async () => {
      mockedApi.getResults.mockResolvedValueOnce({
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
      expect(mockedApi.getResults).toBeCalledTimes(0);
      expect(searchResult.value).toStrictEqual(null);
    });
    it("should have error on rejection from API client", async () => {
      mockedApi.getResults.mockRejectedValueOnce({
        message: "Something went wrong",
      } as any);

      const { search, searchResult } = useProductSearch();
      try {
        await search("test");
      } catch (e) {
        expect(e).toStrictEqual({ message: "Something went wrong" });
      }

      expect(mockedApi.getResults).toBeCalledTimes(1);
      expect(searchResult.value).toStrictEqual(null);
    });
  });
  describe("changePage", () => {
    it("should append the provided page to the pagination object", async () => {
      const { search, changePage } = useProductSearch();
      await search("test");
      await changePage(5);
      expect(mockedApi.getResults).toBeCalledWith("test", {
        pagination: { limit: undefined, page: 5 },
      });
      expect(mockedApi.getResults).toBeCalledTimes(2);
    });
  });
});
