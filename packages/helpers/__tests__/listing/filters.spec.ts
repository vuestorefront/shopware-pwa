import {
  getFilterSearchCriteria,
  getSortingSearchCriteria
} from "@shopware-pwa/helpers";

describe("Shopware helpers - getFilterSearchCriteria", () => {
  it("should return an empty array if no filters provided", () => {
    const result = getFilterSearchCriteria(undefined as any);
    expect(result).toEqual([]);
  });

  it("should return category filter if any provided", () => {
    const result = getFilterSearchCriteria({
      categoryTree: ["12345", "2345"]
    } as any);
    expect(result).toEqual([
      {
        field: "product.categoriesRo.id",
        type: "equals",
        value: "12345"
      }
    ]);
  });

  it("should return manufacturerId filter if any provided", () => {
    const result = getFilterSearchCriteria({
      manufacturer: ["divante-ltd"]
    } as any);
    expect(result).toEqual([
      {
        field: "manufacturerId",
        type: "equalsAny",
        value: ["divante-ltd"]
      }
    ]);
  });

  it("should return shipping-free filter if any provided", () => {
    const result = getFilterSearchCriteria({ "shipping-free": true });
    expect(result).toEqual([
      {
        field: "shipping-free",
        type: "equals",
        value: true
      }
    ]);
  });

  it("should return shipping-free filter if any provided", () => {
    const result = getFilterSearchCriteria({ "shipping-free": true });
    expect(result).toEqual([
      {
        field: "shipping-free",
        type: "equals",
        value: true
      }
    ]);
  });

  it("should return price filter if any provided", () => {
    const result = getFilterSearchCriteria({
      price: {
        gte: 5,
        lte: 10
      }
    });
    expect(result).toEqual([
      {
        field: "price",
        type: "range",
        parameters: {
          gte: 5,
          lte: 10
        }
      }
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
            value: ["black", "blue"]
          },
          {
            field: "optionIds",
            type: "equalsAny",
            value: ["black", "blue"]
          }
        ]
      }
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
      order: "desc"
    } as any);
    expect(result).toEqual({
      field: "price",
      desc: true
    });
  });
});
