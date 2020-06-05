import {
  getFilterSearchCriteria,
  getSortingSearchCriteria,
  toggleFilter,
} from "@shopware-pwa/helpers";
import {
  SearchFilterType,
  EqualsFilter,
  EqualsAnyFilter,
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";

describe("Shopware helpers - getFilterSearchCriteria", () => {
  it("should return an empty array if no filters provided", () => {
    const result = getFilterSearchCriteria(undefined as any);
    expect(result).toEqual([]);
  });

  it("should ignore default filter type on unexpected EqualsAnyFilter filter format", () => {
    const result = getFilterSearchCriteria({
      someFilter: {},
    } as any);
    expect(result).toEqual([]);
  });

  it("should return category filter if any provided", () => {
    const result = getFilterSearchCriteria({
      categoryTree: ["12345", "2345"],
    } as any);
    expect(result).toEqual([
      {
        field: "product.categoriesRo.id",
        type: "equals",
        value: "12345",
      },
    ]);
  });

  it("should return manufacturerId filter if any provided", () => {
    const result = getFilterSearchCriteria({
      manufacturer: ["divante-ltd"],
    } as any);
    expect(result).toEqual([
      {
        field: "manufacturerId",
        type: "equalsAny",
        value: ["divante-ltd"],
      },
    ]);
  });

  it("should return shipping-free filter if any provided", () => {
    const result = getFilterSearchCriteria({ "shipping-free": true });
    expect(result).toEqual([
      {
        field: "shipping-free",
        type: "equals",
        value: true,
      },
    ]);
  });

  it("should return shipping-free filter if any provided", () => {
    const result = getFilterSearchCriteria({ "shipping-free": true });
    expect(result).toEqual([
      {
        field: "shipping-free",
        type: "equals",
        value: true,
      },
    ]);
  });

  it("should return price filter if any provided", () => {
    const result = getFilterSearchCriteria({
      price: {
        gte: 5,
        lte: 10,
      },
    });
    expect(result).toEqual([
      {
        field: "price",
        type: "range",
        parameters: {
          gte: 5,
          lte: 10,
        },
      },
    ]);
  });

  it("should return propertyIds filter", () => {
    const result = getFilterSearchCriteria({ color: ["black", "blue"] });
    expect(result).toEqual([
      {
        type: "multi",
        operator: "OR",
        queries: [
          {
            field: "propertyIds",
            type: "equalsAny",
            value: ["black", "blue"],
          },
          {
            field: "optionIds",
            type: "equalsAny",
            value: ["black", "blue"],
          },
        ],
      },
    ]);
  });
});

describe("Shopware helpers - getSortingSearchCriteria", () => {
  it("should return an empty object if no sorting provided", () => {
    const result = getSortingSearchCriteria(undefined as any);
    expect(result).toEqual({});
  });

  it("should return proper sorting object in descending order", () => {
    const result = getSortingSearchCriteria({
      field: "price",
      order: "desc",
    } as any);
    expect(result).toEqual({
      field: "price",
      desc: true,
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

    it("filters should append the existing one", async () => {
      const selectedCriteria = { filters: {} } as any;

      toggleFilter(
        {
          type: SearchFilterType.EQUALS_ANY,
          value: ["white", "black"],
          field: "color",
        } as EqualsAnyFilter,
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
