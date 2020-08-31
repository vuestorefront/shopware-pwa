import { getListingAvailableFilters } from "@shopware-pwa/helpers";

describe("Shopware helpers - getListingAvailableFilters", () => {
  it("should return an empty array if no filters provided", () => {
    const result = getListingAvailableFilters(undefined as any);
    expect(result).toEqual([]);
  });
  it("should return an empty array if aggregation name is unresolved", () => {
    const aggregation = {
      price: {},
      rating: {},
    } as any;

    const result = getListingAvailableFilters(aggregation);
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
    const result = getListingAvailableFilters(aggregation);
    expect(result).toEqual([
      {
        name: "manufacturer",
        options: [
          {
            color: undefined,
            label: "Rolfson-Schuppe",
            value: "2cc7db79c4214b448df87fb6642ebc57",
          },
        ],
        type: "entity",
      },
    ]);
  });
  it("should return transformed filter if properties property is resolved", () => {
    const aggregations = {
      properties: {
        entities: [
          {
            name: "color",
            options: [
              {
                name: "mediumblue",
                colorHexCode: "#ffc",
                translated: {
                  name: "mediumblue",
                },
                id: "e4af09b1c8ac463ca7a61fac99e71226",
              },
            ],
            id: "8c6aadfc5ed84a7db0b54935e3f60403",
          },
        ],
      },
    } as any;
    const result = getListingAvailableFilters(aggregations);
    expect(result).toEqual([
      {
        name: "color",
        options: [
          {
            color: "#ffc",
            label: "mediumblue",
            value: "e4af09b1c8ac463ca7a61fac99e71226",
          },
        ],
        type: "entity",
      },
    ]);
  });
  it("should return an empty array if resolved aggregation has no values", () => {
    const aggregation = {
      manufacturer: {},
    } as any;

    const result = getListingAvailableFilters(aggregation);
    expect(result).toEqual([]);
  });
});
