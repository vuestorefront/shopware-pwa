import {
  getFilterSearchCriteria,
  getSortingSearchCriteria,
} from "@shopware-pwa/helpers";

describe("Shopware helpers - getFilterSearchCriteria", () => {
  console.error = jest.fn();
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

  it("should return shipping-free filter if any provided", () => {
    const result = getFilterSearchCriteria({
      "shipping-free": {
        type: "max",
        max: 1,
        field: "shipping-free",
      },
    } as any);
    expect(result).toEqual([
      {
        type: "max",
        max: 1,
        field: "shipping-free",
      },
    ]);
  });

  it("should return rating filter if any provided", () => {
    const result = getFilterSearchCriteria({
      rating: {
        max: 4,
        field: "rating",
        type: "max",
      },
    } as any);
    expect(result).toEqual([
      {
        field: "rating",
        type: "max",
        max: 4,
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

  it("should return an empty array if no positive values provided as the id", () => {
    const result = getFilterSearchCriteria({
      manufacturer: [undefined],
    } as any);
    expect(result).toStrictEqual([]);
  });

  it("should return shipping-free filter if any provided", () => {
    const result = getFilterSearchCriteria({
      "shipping-free": {
        field: "shipping-free",
        max: true,
        type: "max",
      },
    });
    expect(result).toEqual([
      {
        field: "shipping-free",
        max: true,
        type: "max",
      },
    ]);
  });

  it("should return shipping-free filter if any provided", () => {
    const result = getFilterSearchCriteria({
      "shipping-free": {
        field: "shipping-free",
        max: true,
        type: "max",
      },
    });
    expect(result).toEqual([
      {
        field: "shipping-free",
        max: true,
        type: "max",
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
      translated: {
        name: "price",
      },
      order: "desc",
    } as any);
    expect(result).toEqual({
      field: "price",
      desc: true,
      name: "price",
    });
  });
  it("should return sorting with name translated from fallback property", () => {
    const result = getSortingSearchCriteria({
      field: "price",
      name: "price",
      order: "desc",
    } as any);
    expect(result).toEqual({
      field: "price",
      desc: true,
      name: "price",
    });
  });
});
