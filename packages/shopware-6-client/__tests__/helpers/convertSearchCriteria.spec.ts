import { convertSearchCriteria } from "../../src/helpers/searchConverter";
import {
  SearchFilterType,
  EqualsFilter,
  RangeFilter,
  MultiFilter
} from "../../src/interfaces/search/SearchFilter";
import { PaginationLimit } from "../../src/interfaces/search/Pagination";
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
      expect(result).toEqual({ page: 1, limit: config.defaultPaginationLimit });
    });
    it("should have page number", () => {
      const result = convertSearchCriteria({ pagination: { limit: 5 } });
      expect(result).toEqual({ limit: 5 });
    });
    it("should not have not existing limit", () => {
      const result = convertSearchCriteria({ pagination: { limit: 7 } });
      expect(result).toEqual({});
    });
    it("should not add pagination for an empty object", () => {
      const result = convertSearchCriteria({ pagination: {} });
      expect(result).toEqual({});
    });
    it("should have full pagination info", () => {
      const result = convertSearchCriteria({
        pagination: {
          page: 3,
          limit: 5
        }
      });
      expect(result).toEqual({ page: 3, limit: 5 });
    });
    it("should change default pagination limit", () => {
      update({ defaultPaginationLimit: 50 });
      const result = convertSearchCriteria({
        pagination: { page: PaginationLimit.ONE }
      });
      expect(result).toEqual({ page: 1, limit: 50 });
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
      expect(paramsObject).toEqual({
        page: 1,
        limit: config.defaultPaginationLimit,
        sort: "name"
      });
    });
    it("should add prefix when desc sort", () => {
      const result = convertSearchCriteria({
        sort: {
          field: "name",
          desc: true
        }
      });
      expect(result).toEqual({ sort: "-name" });
    });
  });
  describe("filters", () => {
    it("should not have filter property if empty array provided", () => {
      const paramsObject = convertSearchCriteria({
        filters: []
      });
      expect(paramsObject).toEqual({});
    });
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
        expect(result).toEqual({
          filter: [
            {
              type: "equals",
              value: "Aerodynamic Iron Jetsilk",
              field: "name"
            }
          ]
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
        expect(result).toEqual({
          filter: [
            {
              type: "range",
              field: "price",
              parameters: {
                lt: 120,
                gte: 5
              }
            }
          ]
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
        expect(result).toEqual({
          filter: [
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
            }
          ]
        });
      });
    });
  });
  describe("configuration", () => {
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
        expect(result).toEqual({ associations: { media: {} } });
      });

      it("should not add associations on empty array", () => {
        const result = convertSearchCriteria({
          configuration: {
            associations: []
          }
        });
        expect(result).toEqual({});
      });

      it("should return multiple associations", () => {
        const result = convertSearchCriteria({
          configuration: {
            associations: [
              {
                name: "media"
              },
              {
                name: "stock"
              }
            ]
          }
        });
        expect(result).toEqual({ associations: { media: {}, stock: {} } });
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
        expect(result).toEqual({
          associations: {
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
          }
        });
      });
    });
  });
});
