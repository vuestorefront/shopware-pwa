import { convertSearchCriteria } from "../../src/helpers/searchConverter";
import {
  SearchFilterType,
  EqualsFilter,
  RangeFilter,
  MultiFilter
} from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { PaginationLimit } from "@shopware-pwa/commons/interfaces/search/Pagination";
import { config, setup, update } from "@shopware-pwa/shopware-6-client";

describe("SearchConverter - convertSearchCriteria", () => {
  beforeEach(() => {
    setup();
  });
  it("should returns empty object if no params provided", () => {
    const result = convertSearchCriteria();
    expect(result).toEqual({});
  });
  describe("pagination", () => {
    it("should have page number with default limit if not provided", () => {
      const result = convertSearchCriteria({
        pagination: { page: PaginationLimit.ONE }
      });
      expect(result?.page).toEqual(1);
      expect(result?.limit).toEqual(config.defaultPaginationLimit);
    });
    it("should have page number", () => {
      const result = convertSearchCriteria({ pagination: { limit: 5 } });
      expect(result?.limit).toEqual(5);
    });
    it("should not have not existing limit", () => {
      const result = convertSearchCriteria({ pagination: { limit: 7 } });
      expect(result).not.toHaveProperty("limit");
    });
    it("should not add pagination for an empty object", () => {
      const result = convertSearchCriteria({ pagination: {} });
      expect(result).not.toHaveProperty("page");
    });
    it("should have full pagination info", () => {
      const result = convertSearchCriteria({
        pagination: {
          page: 3,
          limit: 5
        }
      });
      expect(result?.page).toEqual(3);
      expect(result?.limit).toEqual(5);
    });
    it("should change default pagination limit", () => {
      update({ defaultPaginationLimit: 50 });
      const result = convertSearchCriteria({
        pagination: { page: PaginationLimit.ONE }
      });
      expect(result?.page).toEqual(1);
      expect(result?.limit).toEqual(50);
    });
  });
  describe("sorting", () => {
    it("should have pagination and sort params", () => {
      const paramsObject = convertSearchCriteria({
        pagination: { page: 1 },
        sort: {
          field: "name"
        },
        filters: []
      });
      expect(paramsObject?.page).toEqual(1);
      expect(paramsObject?.limit).toEqual(config.defaultPaginationLimit);
      expect(paramsObject?.sort).toEqual("name");
    });
    it("should add prefix when desc sort", () => {
      const result = convertSearchCriteria({
        sort: {
          field: "name",
          desc: true
        }
      });
      expect(result?.sort).toEqual("-name");
    });
  });
  describe("filters", () => {
    describe("EQUALS filters", () => {
      it("should filter by name", () => {
        const nameFilter: EqualsFilter = {
          type: SearchFilterType.EQUALS,
          field: "name",
          value: "Aerodynamic Iron Jetsilk"
        };
        const result = convertSearchCriteria({
          filters: [nameFilter]
        });
        expect(result?.filter?.[0]).toEqual({
          type: "equals",
          value: "Aerodynamic Iron Jetsilk",
          field: "name"
        });
      });
    });
    describe("RANGE filters", () => {
      it("should filter by range", () => {
        const nameFilter: RangeFilter = {
          type: SearchFilterType.RANGE,
          field: "price",
          parameters: {
            lt: 120,
            gte: 5
          }
        };
        const result = convertSearchCriteria({
          filters: [nameFilter]
        });
        expect(result?.filter?.[0]).toEqual({
          type: "range",
          field: "price",
          parameters: {
            lt: 120,
            gte: 5
          }
        });
      });
    });
    describe("MULTI filters", () => {
      it("should have multifilter for products with name A or B and price gte 0 lte 200", () => {
        const nameFilter: EqualsFilter = {
          type: SearchFilterType.EQUALS,
          field: "name",
          value: "Aerodynamic Iron Jetsilk"
        };
        const otherNameFilter: EqualsFilter = {
          type: SearchFilterType.EQUALS,
          field: "name",
          value: "Rustic Copper Jimbies"
        };
        const priceFilter: RangeFilter = {
          type: SearchFilterType.RANGE,
          field: "price",
          parameters: {
            gte: 0,
            lte: 200
          }
        };
        const oneFromNameFilter: MultiFilter = {
          type: SearchFilterType.MULTI,
          operator: "OR",
          queries: [nameFilter, otherNameFilter]
        };
        const priceAndNamesFilter: MultiFilter = {
          type: SearchFilterType.MULTI,
          operator: "AND",
          queries: [priceFilter, oneFromNameFilter]
        };
        const result = convertSearchCriteria({
          filters: [priceAndNamesFilter]
        });
        expect(result?.filter).toEqual([
          {
            type: "multi",
            operator: "AND",
            queries: [
              {
                type: "range",
                field: "price",
                parameters: {
                  gte: 0,
                  lte: 200
                }
              },

              {
                type: "multi",
                operator: "OR",
                queries: [
                  {
                    type: "equals",
                    value: "Aerodynamic Iron Jetsilk",
                    field: "name"
                  },

                  {
                    type: "equals",
                    value: "Rustic Copper Jimbies",
                    field: "name"
                  }
                ]
              }
            ]
          },
          {
            type: "not",
            queries: [
              {
                type: "equals",
                field: "displayGroup",
                value: null
              }
            ]
          }
        ]);
      });
    });
  });
  describe("term", () => {
    it("should add a term key and proper value", () => {
      const result = convertSearchCriteria({
        term: "fulltext"
      } as any);
      expect(result.term).toEqual("fulltext");
    });
    it("should not add a term key if provided term is null", () => {
      const result = convertSearchCriteria({
        term: null
      } as any);
      expect(result).not.toHaveProperty("term");
    });
  });
  describe("configuration", () => {
    describe("displayParents", () => {
      it("should not return displayGroup grouped parameter and appropriate filter when displayParents switch is on", () => {
        const result = convertSearchCriteria({
          filters: {},
          configuration: {
            displayParents: true
          }
        } as any);
        expect(result).toEqual({});
      });
      it("should return displayGroup grouped parameter and appropriate filter by default", () => {
        const result = convertSearchCriteria({
          filters: [
            {
              type: "equals",
              field: "name",
              value: "test"
            } as any
          ],
          sort: {
            field: "name",
            desc: true
          }
        });
        expect(result).toEqual({
          grouping: {
            field: "displayGroup"
          },
          filter: [
            {
              field: "name",
              type: "equals",
              value: "test"
            },
            {
              type: "not",
              queries: [
                {
                  type: "equals",
                  field: "displayGroup",
                  value: null
                }
              ]
            }
          ],
          sort: "-name"
        });
      });
    });
    describe("grouping", () => {
      it("should return grouped field", () => {
        const result = convertSearchCriteria({
          configuration: {
            grouping: {
              field: "displayGroup"
            }
          }
        });
        expect(result?.grouping).toEqual({ field: "displayGroup" });
      });
    });
    describe("associations", () => {
      it("should return association", () => {
        const result = convertSearchCriteria({
          configuration: {
            associations: [
              {
                name: "media"
              }
            ]
          }
        });
        expect(result?.associations).toEqual({ media: {} });
      });

      it("should not add associations on empty array", () => {
        const result = convertSearchCriteria({
          configuration: {
            associations: []
          }
        });
        expect(result).toHaveProperty("associations");
      });

      it("should return multiple associations", () => {
        const result = convertSearchCriteria({
          configuration: {
            associations: [
              {
                name: "media",
                associations: [
                  {
                    name: "cover"
                  }
                ]
              },
              {
                name: "stock"
              }
            ]
          }
        });
        expect(result?.associations).toEqual({
          media: { associations: { cover: {} } },
          stock: {}
        });
      });

      it("should return deep association", () => {
        const result = convertSearchCriteria({
          configuration: {
            associations: [
              {
                name: "cmsPage",
                associations: [
                  {
                    name: "sections",
                    associations: [
                      { name: "blocks", associations: [{ name: "slots" }] }
                    ]
                  }
                ]
              }
            ]
          }
        });
        expect(result?.associations).toEqual({
          cmsPage: {
            associations: {
              sections: {
                associations: {
                  blocks: {
                    associations: {
                      slots: {}
                    }
                  }
                }
              }
            }
          }
        });
      });
    });
  });
});
