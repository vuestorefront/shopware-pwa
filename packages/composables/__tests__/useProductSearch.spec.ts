import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { useProductSearch } from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/shopware-6-client");
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
const mockedGetProduct = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useProductSearch", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("initial values", () => {
    it("should have no products if search wasn't performed", async () => {
      const { products } = useProductSearch();
      expect(products.value).toHaveLength(0);
    });
    it("should have error with no data", async () => {
      const { error } = useProductSearch();
      expect(error.value).toBeNull();
    });
    it("should have loading value set to false by default", async () => {
      const { loading } = useProductSearch();
      expect(loading.value).toBeFalsy();
    });
  });

  describe("search", () => {
    it("should have appriopriate API call invoked on search action", async () => {
      const { search } = useProductSearch();
      await search("some string");
      expect(mockedGetProduct.getProducts).toBeCalledTimes(1);
      expect(mockedGetProduct.getProducts).toBeCalledWith({
        configuration: {
          associations: [{ name: "options" }, { name: "productReviews" }],
        },
        term: "some string",
      });
    });
    it("should have product returned if search term provided", async () => {
      mockedGetProduct.getProducts.mockResolvedValueOnce({
        data: [{ name: "some string" }],
      } as any);
      const { search, products } = useProductSearch();
      await search("some string");
      expect(products.value).toStrictEqual([{ name: "some string" }]);
    });
    it("should not perform search without any term provided", async () => {
      const { search, products, error } = useProductSearch();
      await search();
      expect(mockedGetProduct.getProducts).toBeCalledTimes(0);
      expect(products.value).toStrictEqual([]);
      expect(error.value).toBe("Term string expected to be passed");
    });
    it("should have error on rejection from API client", async () => {
      mockedGetProduct.getProducts.mockRejectedValueOnce({
        message: "Something went wrong",
      } as any);
      const { search, products, error } = useProductSearch();
      await search("test");
      expect(mockedGetProduct.getProducts).toBeCalledTimes(1);
      expect(products.value).toStrictEqual([]);
      expect(error.value).toStrictEqual({ message: "Something went wrong" });
    });
  });
});
