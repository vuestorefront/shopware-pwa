import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

import { useProduct } from "@shopware-pwa/composables";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedGetProduct = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useProduct", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("no reference to the product", () => {
    it("should have no value if search wasn't performed", async () => {
      const { product } = useProduct();
      const response: any = {
        id: "3f637f17cd9f4891a2d7625d19fb37c9"
      };
      mockedGetProduct.getProduct.mockResolvedValueOnce(response);
      expect(product.value).toBeUndefined();
    });
  });

  describe("search", () => {
    it("should have product under value if search was triggered", async () => {
      const { search, product } = useProduct();
      const response: any = {
        id: "3f637f17cd9f4891a2d7625d19fb37c9"
      };
      mockedGetProduct.getProduct.mockResolvedValueOnce(response);
      expect(product.value).toBeUndefined();
      await search("3f637f17cd9f4891a2d7625d19fb37c9");
      expect(product.value).toBeTruthy();
      expect(product.value.id).toBe("3f637f17cd9f4891a2d7625d19fb37c9");
    });
    it("should keep reference to passed product until search is executed", async () => {
      const passedProduct: any = {
        id: "some-old-id"
      };
      const { search, product } = useProduct(passedProduct);
      const response: any = {
        id: "3f637f17cd9f4891a2d7625d19fb37c9"
      };
      mockedGetProduct.getProduct.mockResolvedValueOnce(response);
      expect(product.value).toBeTruthy();
      expect(product.value.id).toBe("some-old-id");
      await search("3f637f17cd9f4891a2d7625d19fb37c9");
      expect(product.value).toBeTruthy();
      expect(product.value.id).toBe("3f637f17cd9f4891a2d7625d19fb37c9");
    });
  });

  describe("loadAssociations", () => {
    it("should load associations from parent if parentId is not null", async () => {
      const loadedProduct: any = {
        id: "3f637f17cd9f4891a2d7625d19fb37c9",
        parentId: "1c3e927309014a67a07f3bb574f9e804"
      };
      mockedGetProduct.getProduct.mockResolvedValueOnce({} as any);
      const { loadAssociations } = useProduct(loadedProduct);
      loadAssociations({} as any);
      expect(mockedGetProduct.getProduct).toBeCalledWith(
        "1c3e927309014a67a07f3bb574f9e804",
        {}
      );
    });

    it("should have associations if loadAssociations was triggered", async () => {
      const loadedProduct: any = {
        id: "3f637f17cd9f4891a2d7625d19fb37c9"
      };
      const { loadAssociations, product } = useProduct(loadedProduct);
      const responseLoadAssociations: any = {
        id: "3f637f17cd9f4891a2d7625d19fb37c9",
        options: [],
        media: [],
        productReviews: []
      };
      mockedGetProduct.getProduct.mockResolvedValueOnce(
        responseLoadAssociations
      );
      const associations = {
        "associations[media][]": true,
        "associations[options][associations][group][]": true,
        "associations[productReviews][]": true
      };
      await loadAssociations("3f637f17cd9f4891a2d7625d19fb37c9", associations);
      expect(product.value).toHaveProperty("productReviews");
      expect(product.value).toHaveProperty("media");
    });
    it("should have failed on empty product during loading associations", async () => {
      const { loadAssociations, error } = useProduct();
      try {
        await loadAssociations({});
      } catch (e) {
        expect(e.toString()).toBe(
          "Associations cannot be loaded for undefined product"
        );
      }
      expect(error.value).toBeNull();
    });
  });

  describe("problems", () => {
    it("should have failed on bad url settings", async () => {
      const { search, product, error } = useProduct();
      mockedGetProduct.getProduct.mockRejectedValueOnce({
        message: "Something went wrong..."
      } as ClientApiError);
      expect(product.value).toBeUndefined();
      await search("");
      expect(product.value).toBeUndefined();
      expect(error.value).toEqual("Something went wrong...");
    });
  });
});
