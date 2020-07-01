import {
  appendSearchCriteriaToUrl,
  appendQueryParamsToSearchCriteria,
  resetSearchCriteria,
  toggleFilter,
  toggleEntityFilter,
} from "../../src/internalHelpers/searchCriteria";
import {
  SearchFilterType,
  EqualsFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";

describe("composables searchCriteria", () => {
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
        "/?query=a%20term&manufacturer=12345"
      );
      replaceStateSpy.mockRestore();
    });
  });

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

  describe("resetSearchCriteria", () => {
    it("should reset the whole search criteria, create missing properties if not exists", () => {
      const searchCriteria = {
        manufacturer: ["divante"],
        properties: ["123", "4441"],
        sort: undefined,
        pagination: undefined,
      };

      resetSearchCriteria(searchCriteria);
      expect(searchCriteria).toStrictEqual({
        manufacturer: [],
        properties: [],
        sort: {},
        pagination: {
          page: undefined,
          limit: undefined,
        },
      });
    });
  });

  describe("toggleEntityFilter", () => {
    it("filters should not contain any filter on init", async () => {
      const selectedCriteria = { filters: {} } as any;
      toggleEntityFilter(undefined as any, selectedCriteria);
      expect(selectedCriteria.filters).toStrictEqual({});
    });

    it("filters should be filled with passed one", async () => {
      const selectedCriteria = { filters: {} } as any;
      toggleEntityFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "white",
          field: "test",
        } as EqualsFilter,
        selectedCriteria
      );

      expect(selectedCriteria.properties).toStrictEqual(["white"]);
    });
    it("filters should remove the existing one if toggled - not manufacturer", async () => {
      const selectedCriteria = { filters: {} } as any;

      toggleEntityFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "test-value",
          field: "test",
        } as EqualsFilter,
        selectedCriteria
      );

      toggleEntityFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "test-value",
          field: "test",
        } as EqualsFilter,
        selectedCriteria
      );

      expect(selectedCriteria.properties).toStrictEqual([]);
    });
    it("filters should remove the existing one if toggled - manufacturer", async () => {
      const selectedCriteria = { filters: {} } as any;

      toggleEntityFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "divante",
          field: "manufacturer",
        } as EqualsFilter,
        selectedCriteria
      );

      toggleEntityFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "divante",
          field: "manufacturer",
        } as EqualsFilter,
        selectedCriteria
      );

      expect(selectedCriteria.properties).toStrictEqual([]);
    });
  });

  describe("toggleFilter", () => {
    it("filters should not contain any filter on init", async () => {
      const selectedCriteria = { filters: {} } as any;
      toggleFilter(undefined as any, selectedCriteria);
      expect(selectedCriteria.filters).toStrictEqual({});
    });

    it("filters should be filled with passed one", async () => {
      const selectedCriteria = { filters: {} } as any;
      toggleFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "white",
          field: "color",
        } as EqualsFilter,
        selectedCriteria
      );

      expect(selectedCriteria.filters).toHaveProperty("color");
    });

    it("filters should remove the existing one if toggled", async () => {
      const selectedCriteria = { filters: {} } as any;

      toggleFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "white",
          field: "color",
        } as EqualsFilter,
        selectedCriteria
      );

      toggleFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "white",
          field: "color",
        } as EqualsFilter,
        selectedCriteria
      );

      expect(selectedCriteria.filters).toHaveProperty("color");
      expect(selectedCriteria.filters.color).toStrictEqual([]);
    });

    it("filters should append the filters array on force", async () => {
      const selectedCriteria = { filters: {} } as any;

      toggleFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "white",
          field: "color",
        } as EqualsFilter,
        selectedCriteria
      );

      toggleFilter(
        {
          type: SearchFilterType.EQUALS,
          value: "black",
          field: "color",
        } as EqualsFilter,
        selectedCriteria,
        true
      );

      expect(selectedCriteria.filters).toHaveProperty("color");
      expect(selectedCriteria.filters.color).toStrictEqual(["white", "black"]);
    });
  });
});
