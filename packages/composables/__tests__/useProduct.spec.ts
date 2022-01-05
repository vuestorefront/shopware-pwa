import { ClientApiError } from "@shopware-pwa/commons";

import { useProduct } from "../src/hooks/useProduct";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
import { prepareRootContextMock } from "./contextRunner";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedAxios = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

const getDefaultsMock = {
  limit: 5,
  includes: ["product_name"],
  associations: ["some_association"],
};

describe("Composables - useProduct", () => {
  const rootContextMock = prepareRootContextMock();
  beforeEach(() => {
    jest.resetAllMocks();

    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getIncludesConfig: () => getDefaultsMock.includes,
        getAssociationsConfig: () => getDefaultsMock.associations,
      } as any;
    });

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });
  describe("no reference to the product", () => {
    it("should have no value if search wasn't performed", async () => {
      const { product } = useProduct();
      const response: any = {
        id: "3f637f17cd9f4891a2d7625d19fb37c9",
      };
      mockedAxios.getCmsPage.mockResolvedValueOnce(response);
      expect(product.value).toBeNull();
    });
  });

  describe("search", () => {
    it("should not have product under value if response search does not contain product property", async () => {
      const { search, product } = useProduct();
      const response: any = undefined;

      mockedAxios.getProduct.mockResolvedValueOnce(response);
      expect(product.value).toBeNull();
      await search("3f637f17cd9f4891a2d7625d19fb37c9");
      expect(product.value).toBeUndefined();
    });
    it("should have product under value if search was triggered", async () => {
      const { search, product } = useProduct();
      const response: any = {
        product: {
          id: "3f637f17cd9f4891a2d7625d19fb37c9",
        },
      };
      mockedAxios.getProduct.mockResolvedValueOnce(response);
      expect(product.value).toBeNull();
      await search("3f637f17cd9f4891a2d7625d19fb37c9");
      expect(product.value).toBeTruthy();
      expect(product.value?.id).toBe("3f637f17cd9f4891a2d7625d19fb37c9");
    });
    it("should keep reference to passed product until search is executed", async () => {
      const passedProduct: any = {
        id: "some-old-id",
      };
      const { search, product } = useProduct({ product: passedProduct });
      const response: any = {
        product: {
          id: "3f637f17cd9f4891a2d7625d19fb37c9",
        },
      };
      mockedAxios.getProduct.mockResolvedValueOnce(response);
      expect(product.value).toBeTruthy();
      expect(product.value?.id).toBe("some-old-id");
      await search("3f637f17cd9f4891a2d7625d19fb37c9");
      expect(product.value).toBeTruthy();
      expect(product.value?.id).toBe("3f637f17cd9f4891a2d7625d19fb37c9");
    });
  });

  describe("loadAssociations", () => {
    it("should load associations from parent if parentId is not null", async () => {
      const loadedProduct: any = {
        id: "3f637f17cd9f4891a2d7625d19fb37c9",
        parentId: "1c3e927309014a67a07f3bb574f9e804",
      };
      mockedAxios.getCmsPage.mockResolvedValueOnce({} as any);
      const { loadAssociations } = useProduct({ product: loadedProduct });
      const includesParams = getDefaultsMock.includes;
      const associationsParams = getDefaultsMock.associations;
      loadAssociations({} as any);
      expect(mockedAxios.getCmsPage).toBeCalledWith(
        "detail/1c3e927309014a67a07f3bb574f9e804",
        {
          includes: includesParams,
          associations: associationsParams,
        },
        rootContextMock.apiInstance
      );
    });

    it("should have children association if loadAssociations was triggered", async () => {
      const loadedProduct: any = {
        id: "3f637f17cd9f4891a2d7625d19fb37c9",
      };
      const { loadAssociations, product } = useProduct({
        product: loadedProduct,
      });
      const responseLoadAssociations: any = {
        product: {
          id: "3f637f17cd9f4891a2d7625d19fb37c9",
          crossSellings: { id: "cross-id" },
        },
      };
      mockedAxios.getCmsPage.mockResolvedValueOnce(responseLoadAssociations);
      await loadAssociations();
      expect(product.value).toHaveProperty("crossSellings");
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
      mockedAxios.getProduct.mockRejectedValueOnce({
        messages: [{ detail: "Something went wrong..." }],
      } as ClientApiError);
      expect(product.value).toBeNull();
      await search("");
      expect(product.value).toBeNull();
      expect(error.value).toEqual([{ detail: "Something went wrong..." }]);
    });
  });
});
