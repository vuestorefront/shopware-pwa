import { convertToStoreApiFilters } from "../../src/helpers/convertToStoreApiFilters";

import { setup } from "@shopware-pwa/shopware-6-client";

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
});
