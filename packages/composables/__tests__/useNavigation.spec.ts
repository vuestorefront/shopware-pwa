import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useNavigation } from "../src/hooks/useNavigation";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedGetPage = shopwareClient as jest.Mocked<typeof shopwareClient>;
import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

describe("Composables - useNavigation", () => {
  const getDefaultsMock = jest.fn().mockImplementation(() => {
    return {
      useNavigation: {},
    };
  });

  mockedComposables.useDefaults.mockImplementation(() => {
    return {
      getDefaults: getDefaultsMock,
      getIncludesConfig: jest.fn(),
      getAssociationsConfig: jest.fn(),
    } as any;
  });
  mockedComposables.getApplicationContext.mockImplementation(() => {
    return {
      apiInstance: jest.fn(),
    } as any;
  });

  const rootContextMock: any = {
    $store: jest.fn(),
    $shopwareApiInstance: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("computed", () => {
    describe("routes", () => {
      it("should get null when routeNames are not fetched", () => {
        const { routes } = useNavigation(rootContextMock);
        expect(routes.value).toBe(null);
      });
    });
  });

  describe("methods", () => {
    describe("fetchRoutes", () => {
      it("should routes set to null when navigation data are not fetched", async () => {
        mockedGetPage.getStoreNavigation.mockResolvedValueOnce(
          undefined as any
        );
        const { routes, fetchRoutes } = useNavigation(rootContextMock);
        await fetchRoutes();
        expect(routes.value).toBeUndefined();
      });
      it("should fetch routes correcly", async () => {
        mockedGetPage.getStoreNavigation.mockResolvedValueOnce([
          {
            name: "Clothin",
            translated: { name: "Clothin" },
            route: { path: "clothing/" },
          },
          {
            name: "Sports",
            translated: { name: "Sports" },
            route: { path: "sports/" },
          },
          {
            name: "Accessories & Others",
            translated: { name: "Accessories & Others" },
            route: { path: "accessories-others/" },
          },
        ] as any);
        const { routes, fetchRoutes } = useNavigation(rootContextMock);
        await fetchRoutes();
        expect(routes.value).toHaveLength(3);
      });
    });
    describe("fetchNavigationElements", () => {
      it("should fetch navigation elements correcly", async () => {
        mockedGetPage.getStoreNavigation.mockResolvedValueOnce([
          { name: "Clothin", route: { path: "clothing/" } },
          { name: "Sports", route: { path: "sports/" } },
          {
            name: "Accessories & Others",
            route: { path: "accessories-others/" },
          },
        ] as any);

        const { navigationElements, fetchNavigationElements } = useNavigation(
          rootContextMock
        );
        await fetchNavigationElements(2);
        expect(navigationElements.value).toHaveLength(3);
      });

      it("should return an empty array for navigation if ther is no chilren", async () => {
        mockedGetPage.getStoreNavigation.mockResolvedValueOnce([] as any);
        const { navigationElements, fetchNavigationElements } = useNavigation(
          rootContextMock
        );
        await fetchNavigationElements(2);
        expect(navigationElements.value).toEqual([]);
      });

      it("should return an empty array for navigation if the response is nullish", async () => {
        mockedGetPage.getStoreNavigation.mockResolvedValueOnce(
          undefined as any
        );
        const { navigationElements, fetchNavigationElements } = useNavigation(
          rootContextMock
        );
        await fetchNavigationElements(2);
        expect(navigationElements.value).toEqual([]);
      });
    });
  });
});
