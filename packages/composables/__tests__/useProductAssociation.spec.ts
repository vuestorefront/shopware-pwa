import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import { useProductAssociation } from "../src/logic/useProductAssociation";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedAxios = shopwareClient as jest.Mocked<typeof shopwareClient>;

describe("Composables - useProductAssociation", () => {
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
        contextName: "useProductAssociation",
      } as any;
    });
  });
  describe("on init", () => {
    it("should have empty (array) associations computed property and isLoading to false", () => {
      const { getAssociations, isLoading } = useProductAssociation(
        rootContextMock,
        { id: "product-id" } as any,
        "cross-selling"
      );
      expect(isLoading.value).toBeFalsy();
      expect(getAssociations.value).toStrictEqual([]);
    });
  });
  describe("methods", () => {
    describe("fetch", () => {
      it("should catch the error on apiClient rejection", async () => {
        mockedAxios.invokePost.mockRejectedValueOnce(
          new Error("An error occured")
        );
        const { fetch } = useProductAssociation(
          rootContextMock,
          { id: "product-id" } as any,
          "cross-selling"
        );
        await fetch(undefined as any);
        expect(consoleErrorSpy).toBeCalledWith(
          `[useProductAssociation][fetch][error]:`,
          expect.any(Error)
        );
      });
      it("should invoke GET request (default is POST) for given association within a product endpoint", async () => {
        mockedAxios.invokePost.mockResolvedValueOnce({
          data: {
            associatedProducts: [],
          },
        });
        const { fetch, getAssociations } = useProductAssociation(
          rootContextMock,
          { id: "product-id" } as any,
          "cross-selling"
        );
        await fetch(undefined as any);
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

        expect(getAssociations.value).toStrictEqual({ associatedProducts: [] });
      });
      it("should not set incoming associations if response does not match for POST", async () => {
        mockedAxios.invokePost.mockResolvedValueOnce(undefined);
        const { fetch, getAssociations } = useProductAssociation(
          rootContextMock,
          { id: "product-id" } as any,
          "cross-selling"
        );
        await fetch(undefined as any);
        expect(getAssociations.value).toStrictEqual([]);
      });
      it("should set incoming associations if response matches for GET", async () => {
        mockedAxios.invokeGet.mockResolvedValueOnce({ data: 12345 });
        const { fetch, getAssociations } = useProductAssociation(
          rootContextMock,
          { id: "product-id" } as any,
          "cross-selling"
        );
        await fetch({ method: "get" } as any);
        expect(getAssociations.value).toStrictEqual(12345);
      });
      it("should invoke GET request  for given association within a product endpoint", async () => {
        const { fetch } = useProductAssociation(
          rootContextMock,
          { id: "product-id" } as any,
          "cross-selling"
        );
        await fetch({ method: "get" } as any);
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
        const { fetch } = useProductAssociation(
          rootContextMock,
          { id: "product-id" } as any,
          "cross-selling"
        );
        await fetch({ method: "get", params: "?someParam=true" } as any);
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
