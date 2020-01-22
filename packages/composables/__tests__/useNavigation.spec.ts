import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useNavigation } from "@shopware-pwa/composables";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedGetPage = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useNavigation", () => {
  describe("computed", () => {
    describe("routeNames", () => {
      it("should get null when routeNames are not fetched", () => {
        const { routeNames } = useNavigation();
        expect(routeNames.value).toBe(null);
      });
    });
  });

  describe("methods", () => {
    describe("fetchRouteNames", () => {
      it("should routeNames set to null when navigation data are not fetched", async () => {
        mockedGetPage.getNavigation.mockResolvedValueOnce({} as any);
        const { routeNames, fetchRouteNames } = useNavigation();
        await fetchRouteNames();
        expect(routeNames.value).toBe(null);
      });
      it("should fetch routeNames correcly", async () => {
        mockedGetPage.getNavigation.mockResolvedValueOnce({
          count: 3,
          children: [{ name: "test1" }, { name: "test2" }, { name: "test3" }]
        } as any);
        const { routeNames, fetchRouteNames } = useNavigation();
        await fetchRouteNames();
        expect(routeNames.value).toEqual(["test1", "test2", "test3"]);
      });
    });

    describe("convertToSlug", () => {
      it("should return empty string when nothing provided in prams", () => {
        const { convertToSlug } = useNavigation();
        expect(convertToSlug()).toEqual("");
      });
      it("should convert string without space to slug correcly", () => {
        const { convertToSlug } = useNavigation();
        expect(convertToSlug("test")).toEqual("/test/");
      });
      it("should convert string with spaces to slug correcly", () => {
        const { convertToSlug } = useNavigation();
        expect(convertToSlug("test test")).toEqual("/test-test/");
      });
    });
  });
});
