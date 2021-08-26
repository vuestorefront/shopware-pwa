import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import { useProductAssociations } from "../src/logic/useProductAssociations";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedAxios = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useProductAssociations", () => {
  const consoleErrorSpy = jest.spyOn(console, "error");
  const mockedInvokePost = jest.fn();
  const mockedInvokeGet = jest.fn();
  const rootContextMock: any = {
    $shopwareApiInstance: {
      defaults: {
        headers: {},
      },
      invokePost: mockedInvokePost,
      invokeGet: mockedInvokeGet,
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy.mockImplementationOnce(() => {});
    mockedAxios.getProductDetailsEndpoint.mockReturnValue(
      "/product/v4/product-id"
    );
    mockedComposables.getApplicationContext.mockImplementation(() => {
      return {
        apiInstance: rootContextMock.$shopwareApiInstance,
        contextName: "useProductAssociations",
      } as any;
    });
  });
  describe("on init", () => {
    it("should have empty (array) associations computed property and isLoading to false", () => {
      const { productAssociations, isLoading } = useProductAssociations({
        product: { id: "product-id" } as any,
        associationContext: "cross-selling",
      });
      expect(isLoading.value).toBeFalsy();
      expect(productAssociations.value).toStrictEqual([]);
    });
  });
  describe("methods", () => {
    describe("loadAssociations", () => {
      it("should catch the error on apiClient rejection", async () => {
        mockedAxios.invokePost.mockRejectedValueOnce(
          new Error("An error occured")
        );
        const { loadAssociations } = useProductAssociations({
          product: { id: "product-id" } as any,
          associationContext: "cross-selling",
        });
        await loadAssociations(undefined as any);
        expect(consoleErrorSpy).toBeCalledWith(
          `[useProductAssociations][loadAssociations][error]:`,
          expect.any(Error)
        );
      });
      it("should invoke GET request (default is POST) for given association within a product endpoint", async () => {
        mockedAxios.invokePost.mockResolvedValueOnce({
          data: {
            associatedProducts: [],
          },
        });
        const { loadAssociations, productAssociations } =
          useProductAssociations({
            product: { id: "product-id" } as any,
            associationContext: "cross-selling",
          });
        await loadAssociations(undefined as any);
        expect(mockedAxios.invokePost).toBeCalledWith(
          {
            address: "/product/v4/product-id/cross-selling",
            payload: undefined,
          },
          {
            defaults: { headers: {} },
            invokeGet: expect.any(Function),
            invokePost: expect.any(Function),
          }
        );

        expect(productAssociations.value).toStrictEqual({
          associatedProducts: [],
        });
      });
      it("should not set incoming associations if response does not match for POST", async () => {
        mockedAxios.invokePost.mockResolvedValueOnce(undefined);
        const { loadAssociations, productAssociations } =
          useProductAssociations({
            product: { id: "product-id" } as any,
            associationContext: "cross-selling",
          });
        await loadAssociations(undefined as any);
        expect(productAssociations.value).toStrictEqual([]);
      });
      it("should set incoming associations if response matches for GET", async () => {
        mockedAxios.invokeGet.mockResolvedValueOnce({ data: 12345 });
        const { loadAssociations, productAssociations } =
          useProductAssociations({
            product: { id: "product-id" } as any,
            associationContext: "cross-selling",
          });
        await loadAssociations({ method: "get" } as any);
        expect(productAssociations.value).toStrictEqual(12345);
      });
      it("should invoke GET request  for given association within a product endpoint", async () => {
        const { loadAssociations } = useProductAssociations({
          product: { id: "product-id" } as any,
          associationContext: "cross-selling",
        });
        await loadAssociations({ method: "get" } as any);
        expect(mockedAxios.invokeGet).toBeCalledWith(
          {
            address: "/product/v4/product-id/cross-selling",
            payload: undefined,
          },
          {
            defaults: { headers: {} },
            invokeGet: expect.any(Function),
            invokePost: expect.any(Function),
          }
        );
      });
      it("should invoke GET request for given association within a product endpoint - including params", async () => {
        const { loadAssociations } = useProductAssociations({
          product: { id: "product-id" } as any,
          associationContext: "cross-selling",
        });
        await loadAssociations({
          method: "get",
          params: "?someParam=true",
        } as any);
        expect(mockedAxios.invokeGet).toBeCalledWith(
          {
            address: "/product/v4/product-id/cross-selling?someParam=true",
            payload: undefined,
          },
          {
            defaults: { headers: {} },
            invokeGet: expect.any(Function),
            invokePost: expect.any(Function),
          }
        );
      });
    });
  });
});
