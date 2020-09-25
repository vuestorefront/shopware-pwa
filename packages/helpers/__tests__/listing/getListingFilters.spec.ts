import { getListingFilters } from "@shopware-pwa/helpers";

describe("Shopware helpers - getListingFilters", () => {
  it("should return an empty array if no filters provided", () => {
    const result = getListingFilters(undefined as any);
    expect(result).toEqual([]);
  });
  it("should return an empty array if aggregation name is unresolved", () => {
    const aggregation = {
      price: {},
      rating: {},
    } as any;

    const result = getListingFilters(aggregation);
    expect(result).toEqual([
      {
        code: "price",
        label: "price",
      },
      {
        code: "rating",
        label: "rating",
      },
    ]);
  });

  it("should return transformed filter if properties have entities", () => {
    const aggregation = {
      properties: {
        entities: [
          {
            translated: {
              name: "Color",
            },
            options: [],
          },
        ],
      },
    } as any;
    const result = getListingFilters(aggregation);
    expect(result).toEqual([
      {
        code: "properties",
        label: "Color",
        translated: {
          name: "Color",
        },
        options: [],
      },
    ]);
  });

  it("should not add aggregation if there is no entities in properties", () => {
    const aggregation = {
      properties: {
        otherValue: true,
      },
    } as any;
    const result = getListingFilters(aggregation);
    expect(result).toEqual([]);
  });

  it("should return transformed filter if manufacturer is resolved", () => {
    const aggregation = {
      manufacturer: {
        entities: [
          {
            translated: {
              name: "Rolfson-Schuppe",
            },
            id: "2cc7db79c4214b448df87fb6642ebc57",
          },
        ],
      },
    } as any;
    const result = getListingFilters(aggregation);
    expect(result).toEqual([
      {
        code: "manufacturer",
        label: "manufacturer",
        entities: [
          {
            translated: {
              name: "Rolfson-Schuppe",
            },
            id: "2cc7db79c4214b448df87fb6642ebc57",
          },
        ],
      },
    ]);
  });

  it("should return an empty array if resolved aggregation has no values", () => {
    const aggregation = {
      manufacturer: {},
    } as any;

    const result = getListingFilters(aggregation);
    expect(result).toEqual([
      {
        code: "manufacturer",
        label: "manufacturer",
      },
    ]);
  });

  it("should handle max filter type", () => {
    const aggregation = {
      "shipping-free": {
        max: "1",
      },
    } as any;

    const result = getListingFilters(aggregation);
    expect(result).toEqual([
      {
        max: "1",
        label: "shipping-free",
        code: "shipping-free",
      },
    ]);
  });
  it("should handle range filter type", () => {
    const aggregation = {
      price: {
        min: "50",
        max: "974",
        avg: 770.5172413793103,
        sum: 22345,
      },
    } as any;

    const result = getListingFilters(aggregation);
    expect(result).toEqual([
      {
        code: "price",
        label: "price",
        max: "974",
        min: "50",
        avg: 770.5172413793103,
        sum: 22345,
      },
    ]);
  });
});
