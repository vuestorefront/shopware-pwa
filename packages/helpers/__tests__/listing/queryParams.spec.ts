import {
  appendQueryParamsToSearchCriteria,
  appendSearchCriteriaToUrl,
} from "@shopware-pwa/helpers";

describe("Shopware helpers - queryParams", () => {
  describe("appendQueryParamsToSearchCriteria", () => {
    it("should not do anything if no listing parameters provided", () => {
      const searchCriteria = {};
      appendQueryParamsToSearchCriteria(undefined as any, searchCriteria);
      expect(searchCriteria).toStrictEqual({});
    });
    it("should create a missing pagination property if does not exist", () => {
      const searchCriteria = {};
      appendQueryParamsToSearchCriteria({ query: "querty" }, searchCriteria);
      expect(searchCriteria).toHaveProperty("pagination");
    });
    it("should assign an empty array if properties or manfacturer are not in string type", () => {
      const searchCriteria: any = {};
      appendQueryParamsToSearchCriteria(
        { query: "querty", manufacturer: undefined, properties: undefined },
        searchCriteria
      );
      expect(searchCriteria.manufacturer).toStrictEqual([]);
      expect(searchCriteria.properties).toStrictEqual([]);
    });
    it("should assign an empty array if properties or manfacturer property does not exist", () => {
      const searchCriteria: any = {};
      appendQueryParamsToSearchCriteria({ query: "querty" }, searchCriteria);
      expect(searchCriteria.manufacturer).toStrictEqual([]);
      expect(searchCriteria.properties).toStrictEqual([]);
    });
    it("should append the search criteria with provided manufacturer as an array of strings", () => {
      const searchCriteria: any = {};
      appendQueryParamsToSearchCriteria(
        { query: "querty", manufacturer: "divante|shopware" },
        searchCriteria
      );
      expect(searchCriteria.manufacturer).toStrictEqual([
        "divante",
        "shopware",
      ]);
    });
    it("should append the search criteria with provided properties as an array of strings", () => {
      const searchCriteria: any = {};
      appendQueryParamsToSearchCriteria(
        { query: "querty", properties: "blue|black" },
        searchCriteria
      );
      expect(searchCriteria.properties).toStrictEqual(["blue", "black"]);
    });
  });
  describe("appendSearchCriteriaToUrl", () => {
    it("should not do anything if no search criteria provided", () => {
      const replaceStateSpy = jest.spyOn(history, "replaceState");
      appendSearchCriteriaToUrl(undefined as any, undefined as any);
      expect(replaceStateSpy).toBeCalledTimes(0);
      replaceStateSpy.mockRestore();
    });
    it("should not invoke replaceState if all searchCriteria are falsy", () => {
      const replaceStateSpy = jest.spyOn(history, "replaceState");
      appendSearchCriteriaToUrl(
        {
          query: undefined,
          page: undefined,
          manufacturer: undefined,
        } as any,
        undefined as any
      );
      expect(replaceStateSpy).toBeCalledTimes(0);
      replaceStateSpy.mockRestore();
    });
    it("should invoke replaceState on history object with provided criteria", () => {
      const replaceStateSpy = jest.spyOn(history, "replaceState");
      appendSearchCriteriaToUrl(
        {
          manufacturer: ["12345"],
        } as any,
        "a term"
      );
      expect(replaceStateSpy).toBeCalledTimes(1);
      expect(replaceStateSpy).toBeCalledWith(
        {},
        null,
        "/?manufacturer=12345&query=a%20term"
      );
      replaceStateSpy.mockRestore();
    });
  });
});
