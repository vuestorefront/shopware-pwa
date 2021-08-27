import { ref, Ref } from "vue-demi";

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import { useCategoryFilters } from "../src/hooks/useCategoryFilters";

const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

describe("Composables - useCategoryFilters", () => {
  const statePage: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
  };
  beforeEach(() => {
    jest.resetAllMocks();
    statePage.value = null;

    mockedComposables.getApplicationContext.mockImplementation(() => {
      return {
        apiInstance: rootContextMock.$shopwareApiInstance,
        contextName: "useCategoryFilters",
      } as any;
    });

    mockedComposables.useCms.mockImplementation(() => {
      return {
        page: statePage,
      } as any;
    });
  });

  it("should display deprecation info on invocation", () => {
    useCategoryFilters();
    expect(consoleWarnSpy).toBeCalledWith(
      '[DEPRECATED][@shopware-pwa/composables][useCategoryFilters] This method has been deprecated. Use "useListing" instead.'
    );
  });

  describe("computed", () => {
    describe("availableFilters", () => {
      it("should return empty array if there is no page loaded", () => {
        const { availableFilters } = useCategoryFilters();
        expect(availableFilters.value).toBeTruthy();
        expect(availableFilters.value).toHaveLength(0);
      });
      it("should return array filters if there is page loaded", () => {
        const { availableFilters } = useCategoryFilters();
        expect(availableFilters.value).toBeTruthy();
        expect(availableFilters.value).toHaveLength(0);
        statePage.value = {
          listingConfiguration: {
            availableFilters: {
              manufacturer: {
                type: "entity",
                name: "manufacturer",
                values: {
                  "4a65e4a0c3f349c789c8a700d5fedba5": {
                    name: "Hill Group",
                  },
                },
              },
            },
          },
        };

        expect(availableFilters.value).toHaveLength(1);
      });
    });
    describe("activeFilters", () => {
      it("should return empty array if there is no page loaded", () => {
        const { activeFilters } = useCategoryFilters();
        expect(activeFilters.value).toBeTruthy();
        expect(activeFilters.value).toHaveLength(0);
      });
      it("should return array of active filters if there is a page loaded", () => {
        statePage.value = {};
        const { activeFilters } = useCategoryFilters();
        expect(activeFilters.value).toBeTruthy();
        expect(activeFilters.value).toHaveLength(0);
        statePage.value = {
          listingConfiguration: {
            activeFilters: {
              navigationId: "34b081d3d1044ab594cd522f672a929d",
              manufacturer: [],
              properties: [],
              "shipping-free": null,
              rating: null,
              price: {
                min: null,
                max: null,
              },
            },
          },
        };

        expect(activeFilters.value).toHaveProperty("manufacturer");
        expect(activeFilters.value).toHaveProperty("properties");
        expect(activeFilters.value).toHaveProperty("shipping-free");
        expect(activeFilters.value).toHaveProperty("rating");
        expect(activeFilters.value).toHaveProperty("price");
      });
    });

    describe("availableSorting", () => {
      it("should return empty array if there is no page loaded", () => {
        const { availableSorting } = useCategoryFilters();
        expect(availableSorting.value).toBeTruthy();
        expect(availableSorting.value).toHaveLength(0);
      });

      it("should return proper sorting if any loaded", () => {
        const listingConfiguration = {
          listingConfiguration: {
            availableSortings: {
              "name-asc": {
                key: "name-asc",
                active: true,
              },
              "name-desc": {
                key: "name-desc",
                active: false,
              },
            },
          },
        };

        statePage.value = listingConfiguration;

        const { availableSorting } = useCategoryFilters();
        expect(availableSorting.value).toBeTruthy();
        expect(availableSorting.value).toHaveLength(2);
        expect(availableSorting.value).toStrictEqual([
          { active: true, field: "name", name: "name-asc", order: "asc" },
          { active: false, field: "name", name: "name-desc", order: "desc" },
        ]);
      });
    });

    describe("activeSorting", () => {
      it("should return no sorting when any is active", () => {
        const { activeSorting } = useCategoryFilters();
        expect(activeSorting.value).toBeFalsy();
      });

      it("should return active sortings", () => {
        const listingConfiguration = {
          listingConfiguration: {
            availableSortings: {
              "name-asc": {
                key: "name-asc",
                active: true,
              },
              "name-desc": {
                key: "name-desc",
                active: false,
              },
            },
          },
        };

        statePage.value = listingConfiguration;

        const { activeSorting } = useCategoryFilters();
        expect(activeSorting.value).toEqual({
          name: "name-asc",
          field: "name",
          order: "asc",
          active: true,
        });
      });
    });
  });
});
