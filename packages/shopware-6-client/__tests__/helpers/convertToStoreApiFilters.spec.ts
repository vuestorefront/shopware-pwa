import { convertToStoreApiFilters } from "../../src/helpers/convertToStoreApiFilters";

import { setup } from "@shopware-pwa/shopware-6-client";
import { SearchFilterType } from "@shopware-pwa/commons/interfaces/search/SearchFilter";

describe("SearchConverter - convertToStoreApiFilters", () => {
  beforeEach(() => {
    setup();
  });
  it("should return empty object if no params provided", () => {
    const result = convertToStoreApiFilters(undefined as any);
    expect(result).toEqual({});
  });

  it("should return empty object if any filter does not match", () => {
    const result = convertToStoreApiFilters([
      {
        field: "test",
      } as any,
    ]);
    expect(result).toEqual({});
  });
  it("should return object with manufacturer property if manufacturerId filter exists", () => {
    const result = convertToStoreApiFilters([
      {
        field: "manufacturerId",
        value: ["divante", "shopware"],
      } as any,
    ]);
    expect(result).toEqual({
      manufacturer: "divante|shopware",
    });
  });
  it("should return object with properties property if multi filter containing propertyIds exists", () => {
    const result = convertToStoreApiFilters([
      {
        type: "multi",
        queries: [
          {
            field: "propertyIds",
            value: ["white", "black", "xs", "l"],
          },
        ],
      } as any,
    ]);
    expect(result).toEqual({
      properties: "white|black|xs|l",
    });
  });
  it("should return object with price range parameters", () => {
    const result = convertToStoreApiFilters([
      {
        type: SearchFilterType.RANGE,
        parameters: {
          lt: 1990,
          gt: 20,
        },
        field: "price",
      } as any,
    ]);
    expect(result).toEqual({
      "max-price": 1990,
      "min-price": 20,
    });
  });
  it("should take the second possible option of range", () => {
    const result = convertToStoreApiFilters([
      {
        type: SearchFilterType.RANGE,
        parameters: {
          lte: 1990,
          gte: 20,
        },
        field: "price",
      } as any,
    ]);
    expect(result).toEqual({
      "max-price": 1990,
      "min-price": 20,
    });
  });
  it("should not contain a missing max part of the range", () => {
    const result = convertToStoreApiFilters([
      {
        type: SearchFilterType.RANGE,
        parameters: {
          gte: 20,
        },
        field: "price",
      } as any,
    ]);
    expect(result).toEqual({
      "min-price": 20,
    });
  });
  it("should not contain a missing min part of the range", () => {
    const result = convertToStoreApiFilters([
      {
        type: SearchFilterType.RANGE,
        parameters: {
          lte: 20,
        },
        field: "price",
      } as any,
    ]);
    expect(result).toEqual({
      "max-price": 20,
    });
  });
});
