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
            id: "2cc7db79c4214b448df87fb6642ebc57",
            label: "Rolfson-Schuppe",
            value: "2cc7db79c4214b448df87fb6642ebc57",
            translated: {
              name: "Rolfson-Schuppe",
            },
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

  it("should treat properties aggregation differently", () => {
    const aggregation = {
      properties: {
        entities: [
          {
            name: "color",
            translated: {
              name: "farbe",
            },
            options: [
              {
                id: "white",
                name: "white",
                colorHexCode: "#fff",
              },
              {
                id: "black",
                name: "black",
                colorHexCode: "#000",
                translated: {
                  name: "schwarz",
                },
              },
            ],
          },
          {
            name: "size",

            options: [
              {
                id: "xs",
                name: "xs",
              },
              {
                id: "xl",
                name: "xl",
                translated: {
                  name: "xl",
                },
              },
            ],
          },
        ],
      },
    } as any;

    const result = getListingAvailableFilters(aggregation);
    expect(result).toStrictEqual([
      {
        name: "farbe",
        options: [
          {
            colorHexCode: "#fff",
            color: "#fff",
            id: "white",
            label: "white",
            name: "white",
            value: "white",
          },
          {
            colorHexCode: "#000",
            color: "#000",
            id: "black",
            label: "schwarz",
            name: "black",
            translated: { name: "schwarz" },
            value: "black",
          },
        ],
        type: "entity",
      },
      {
        name: "size",
        options: [
          {
            color: undefined,
            id: "xs",
            label: "xs",
            name: "xs",
            value: "xs",
          },
          {
            color: undefined,
            id: "xl",
            label: "xl",
            name: "xl",
            translated: { name: "xl" },
            value: "xl",
          },
        ],
        type: "entity",
      },
    ]);
  });

  it("should handle max filter type", () => {
    const aggregation = {
      "shipping-free": {
        max: "1",
      },
    } as any;

    const result = getListingAvailableFilters(aggregation);
    expect(result).toEqual([
      {
        max: "1",
        name: "shipping-free",
        type: "max",
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

    const result = getListingAvailableFilters(aggregation);
    expect(result).toEqual([
      {
        max: "974",
        name: "price",
        type: "range",
        min: "50",
        avg: 770.5172413793103,
        sum: 22345,
      },
    ]);
  });
});
