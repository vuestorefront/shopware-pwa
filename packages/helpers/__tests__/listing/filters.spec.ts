import { toggleSearchFilter } from "@shopware-pwa/helpers";

describe("Shopware helpers - toggleSearchFilter", () => {
  it("should add filter value to selected filters", () => {
    const resultFilters = toggleSearchFilter(
      {},
      {
        code: "properties",
        label: "Size",
        value: "358a5839d6c3446bbca1430c5cf64f01",
      }
    );
    expect(resultFilters).toEqual({
      properties: ["358a5839d6c3446bbca1430c5cf64f01"],
    });
  });

  it("should add filter value to existing properties", () => {
    const resultFilters = toggleSearchFilter(
      {
        properties: ["someExistingId"],
      },
      {
        code: "properties",
        label: "Size",
        value: "358a5839d6c3446bbca1430c5cf64f01",
      }
    );
    expect(resultFilters).toEqual({
      properties: ["someExistingId", "358a5839d6c3446bbca1430c5cf64f01"],
    });
  });

  it("should add filter value to existing properties if existing filter isn't an array", () => {
    const resultFilters = toggleSearchFilter(
      {
        properties: "someExistingId",
      },
      {
        code: "properties",
        label: "Size",
        value: "358a5839d6c3446bbca1430c5cf64f01",
      }
    );
    expect(resultFilters).toEqual({
      properties: ["someExistingId", "358a5839d6c3446bbca1430c5cf64f01"],
    });
  });

  it("should remove filter value from existing properties", () => {
    const resultFilters = toggleSearchFilter(
      {
        properties: ["358a5839d6c3446bbca1430c5cf64f01"],
      },
      {
        code: "properties",
        label: "Size",
        value: "358a5839d6c3446bbca1430c5cf64f01",
      }
    );
    expect(resultFilters).toEqual({});
  });

  it("should remove filter value from existing properties", () => {
    const resultFilters = toggleSearchFilter(
      {
        properties: ["somePropertyId", "358a5839d6c3446bbca1430c5cf64f01"],
      },
      {
        code: "properties",
        label: "Size",
        value: "358a5839d6c3446bbca1430c5cf64f01",
      }
    );
    expect(resultFilters).toEqual({
      properties: ["somePropertyId"],
    });
  });

  it("should not modify existing filters object", () => {
    let filtersBeforeMutation = {};
    toggleSearchFilter(filtersBeforeMutation, {
      code: "properties",
      label: "Size",
      value: "358a5839d6c3446bbca1430c5cf64f01",
    });
    expect(filtersBeforeMutation).toEqual({});
  });

  it("should set range filter", () => {
    const resultFilters = toggleSearchFilter(
      {},
      {
        code: "min-price",
        label: "Price",
        value: "1234",
        type: "range",
      }
    );
    expect(resultFilters).toEqual({
      "min-price": "1234",
    });
  });

  it("should change range filter", () => {
    const resultFilters = toggleSearchFilter(
      { "min-price": "1234" },
      {
        code: "min-price",
        label: "Price",
        value: "321",
        type: "range",
      }
    );
    expect(resultFilters).toEqual({
      "min-price": "321",
    });
  });

  it("should remove range filter", () => {
    const resultFilters = toggleSearchFilter(
      { "min-price": "1234" },
      {
        code: "min-price",
        label: "Price",
        value: "",
        type: "range",
      }
    );
    expect(resultFilters).toEqual({});
  });
});
