import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useNavigation } from "@shopware-pwa/composables";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedGetPage = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useNavigation", () => {
  describe("computed", () => {
    describe("routes", () => {
      it("should get null when routeNames are not fetched", () => {
        const { routes } = useNavigation();
        expect(routes.value).toBe(null);
      });
    });
  });

  describe("methods", () => {
    describe("fetchRoutes", () => {
      it("should routes set to null when navigation data are not fetched", async () => {
        mockedGetPage.getNavigation.mockResolvedValueOnce({} as any);
        const { routes, fetchRoutes } = useNavigation();
        await fetchRoutes();
        expect(routes.value).toBe(null);
      });
      it("should fetch routes correcly", async () => {
        mockedGetPage.getNavigation.mockResolvedValueOnce({
          count: 3,
          children: [
            { name: "Clothin", route: { path: "clothing/" } },
            { name: "Sports", route: { path: "sports/" } },
            {
              name: "Accessories & Others",
              route: { path: "accessories-others/" },
            },
          ],
        } as any);
        const { routes, fetchRoutes } = useNavigation();
        await fetchRoutes();
        expect(routes.value).toHaveLength(3);
      });
    });
  });
});
