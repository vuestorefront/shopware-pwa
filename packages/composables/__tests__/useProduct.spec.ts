import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useProduct } from "@shopware-pwa/composables";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedGetProduct = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Shopware composables - useProduct", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should have no value if search wasn't performed", async () => {
    const { product } = useProduct();
    const response: any = {
      "id": "3f637f17cd9f4891a2d7625d19fb37c9"
    };
    mockedGetProduct.getProduct.mockResolvedValueOnce(response);
    expect(product.value).toBeUndefined()
  });

  it("should have product under value if search was triggered", async () => {
    const { search, product } = useProduct();
    const response: any = {
      "id": "3f637f17cd9f4891a2d7625d19fb37c9"
    };
    mockedGetProduct.getProduct.mockResolvedValueOnce(response);
    expect(product.value).toBeUndefined()
    await search("3f637f17cd9f4891a2d7625d19fb37c9")
    expect(product.value).toBeTruthy()
    expect(product.value.id).toBe("3f637f17cd9f4891a2d7625d19fb37c9")
  });
  it("should keep reference to passed product until search is executed", async () => {
    const passedProduct: any = {
      "id": "some-old-id"
    }
    const { search, product } = useProduct(passedProduct);
    const response: any = {
      "id": "3f637f17cd9f4891a2d7625d19fb37c9"
    };
    mockedGetProduct.getProduct.mockResolvedValueOnce(response);
    expect(product.value).toBeTruthy()
    expect(product.value.id).toBe("some-old-id")
    await search("3f637f17cd9f4891a2d7625d19fb37c9")
    expect(product.value).toBeTruthy()
    expect(product.value.id).toBe("3f637f17cd9f4891a2d7625d19fb37c9")
  });

  it("should have associations if loadAssociations was triggered", async () => {
    const loadedProduct: any = {
      "id": "3f637f17cd9f4891a2d7625d19fb37c9"
    };
    const { loadAssociations, product } = useProduct(loadedProduct);
    const responseLoadAssociations: any = {
      "id": "3f637f17cd9f4891a2d7625d19fb37c9",
      "options": [],
      "media": [],
      "productReviews": []
    };
    mockedGetProduct.getProduct.mockResolvedValueOnce(responseLoadAssociations);
    const associations = {
      "associations[media][]": true,
      "associations[options][associations][group][]": true,
      "associations[productReviews][]": true
    }
    await loadAssociations("3f637f17cd9f4891a2d7625d19fb37c9", associations)
    expect(product.value).toHaveProperty("productReviews")
    expect(product.value).toHaveProperty("media")
    expect(product.value).toHaveProperty("options")
  });

  it("should have failed on empty product during loading associations", async () => {
    const { loadAssociations, product, error } = useProduct();
    //mockedGetProduct.getProduct.mockRejectedValueOnce("Something went wrong...");
    try {
      await loadAssociations("3f637f17cd9f4891a2d7625d19fb37c9", {})
    } catch (e) {
      
    }
    expect(product.value).toBeUndefined()
    expect(error.value).toBeTruthy();
    expect(error.value.toString()).toBe("TypeError: Cannot read property 'id' of undefined");
  });

  it("should have failed on bad url settings", async () => {
    const { search, product, error } = useProduct();
    mockedGetProduct.getProduct.mockRejectedValueOnce("Something went wrong...");
    expect(product.value).toBeUndefined()
    await search("");
    expect(product.value).toBeUndefined()
    expect(error.value).toBeTruthy();
    expect(error.value).toEqual("Something went wrong...");
  });
});
