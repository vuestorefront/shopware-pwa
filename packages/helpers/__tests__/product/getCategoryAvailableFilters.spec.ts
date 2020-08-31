import { getCategoryAvailableFilters } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCategoryAvailableFilters", () => {
  it("should return empty array when the argument is undefined", () => {
    const filters = getCategoryAvailableFilters();
    expect(filters).toHaveLength(0);
  });
  it("should return empty array when the argument is an empty object", () => {
    const filtersArgument: any = {};
    const filters = getCategoryAvailableFilters(filtersArgument);
    expect(filters).toHaveLength(0);
  });
  it("should return array of transformed filters", () => {
    const swFilters: any = {
      textile: {
        type: "entity",
        name: "textile",
        values: {
          "20beab74a1284d05b9661f973bbc6a4b": {
            name: "wool",
          },
          a5f307eb50ed48e3963988787bbfcb74: {
            name: "silk",
          },
        },
      },
      rating: {
        type: "term",
        values: [
          {
            key: "2",
            count: 50,
          },
        ],
      },
      color: {
        type: "entity",
        name: "color",
        values: {
          "085059f79c26400990d7b23eba0911fd": {
            name: "lightseagreen",
            colorHexCode: "#fff",
          },
        },
      },
      novalues: {
        type: "entity",
        name: "novalues",
      },
    };
    const filters = getCategoryAvailableFilters({ filters: swFilters });
    expect(filters).toHaveLength(4);
    const firstFilter: any = filters.shift() || {};
    expect(firstFilter.name).toBe("textile");
    expect(firstFilter.type).toBe("entity");
    expect(firstFilter.options).toHaveLength(2);

    const secondFilter: any = filters.shift() || {};
    expect(secondFilter.name).toBe("rating");
    expect(secondFilter.type).toBe("term");
    expect(secondFilter.options).toHaveLength(1);
    expect(secondFilter.options[0]).not.toHaveProperty("color");

    const thirdFilter: any = filters.shift() || {};
    expect(thirdFilter.name).toBe("color");
    expect(thirdFilter.type).toBe("entity");
    expect(thirdFilter.options).toHaveLength(1);
    expect(thirdFilter.options[0]).toHaveProperty("color");
  });

  it("should return array of untransformed options when the type is unknown ", () => {
    const swFilters: any = {
      textile: {
        type: "unknown",
        name: "unknown",
        values: {
          a: "b",
        },
      },
    };

    const filters = getCategoryAvailableFilters({ filters: swFilters });
    expect(filters[0].name).toBe("unknown");
    expect(filters[0].options).toBe(swFilters.textile.values);
  });
});
