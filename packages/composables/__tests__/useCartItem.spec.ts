import { ref, Ref } from "vue-demi";

//import { LineItem } from "@shopware-pwa/commons/interfaces";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
import defaultApiParams from "../src/internalHelpers/defaultApiParams.json";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedShopwareClient = shopwareClient as jest.Mocked<
  typeof shopwareClient
>;
const consoleWarnSpy = jest.spyOn(console, "warn");
const consoleErrorSpy = jest.spyOn(console, "error");
import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

import * as ErrorHandler from "../src/internalHelpers/errorHandler";
const mockedErrorHandler = ErrorHandler as jest.Mocked<typeof ErrorHandler>;
jest.mock("@shopware-pwa/composables/src/internalHelpers/errorHandler");

import * as Helpers from "@shopware-pwa/helpers";
jest.mock("@shopware-pwa/composables");
const mockedHelpers = Helpers as jest.Mocked<typeof Helpers>;
jest.mock("@shopware-pwa/helpers");

import { useCartItem } from "../src/logic/useCartItem";

describe("Composables - useCart", () => {
  const stateCart: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    $shopwareApiInstance: jest.fn(),
  };
  const interceptMock = jest.fn();
  const broadcastMock = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    stateCart.value = null;
    consoleWarnSpy.mockImplementationOnce(() => {});
    consoleErrorSpy.mockImplementationOnce(() => {});
    const broadcastUpcomingErrorsMocked = jest.fn();
    mockedComposables.useCart.mockImplementation(() => {
      return {
        refreshCart: jest.fn(),
        broadcastUpcomingErrors: broadcastUpcomingErrorsMocked,
      } as any;
    });

    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: () => defaultApiParams.useCart,
      } as any;
    });

    mockedComposables.getApplicationContext.mockImplementation(() => {
      return {
        apiInstance: rootContextMock.$shopwareApiInstance,
        contextName: "useCart",
      } as any;
    });
    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: () => stateCart,
      } as any;
    });

    mockedErrorHandler.broadcastErrors.mockImplementation(() => jest.fn());
    mockedComposables.useIntercept.mockImplementation(() => {
      return {
        broadcast: broadcastMock,
        intercept: interceptMock,
      } as any;
    });
  });
  describe("general", () => {
    it("should throw an error on missing cartItem in constructor", () => {
      expect(() => useCartItem({} as any)).toThrow(
        "[useCartItem] mandatory cartItem argument is missing."
      );
    });
  });
  describe("computed", () => {
    describe("lineItem", () => {
      it("should return computed property made of provided lineItem in constructor", () => {
        const { lineItem } = useCartItem({
          cartItem: {
            id: "some-cart-item",
          } as any,
        });
        expect(lineItem.value).toStrictEqual({
          id: "some-cart-item",
        });
      });
    });
    describe("itemQuantity", () => {
      it("should return item quantity", () => {
        const cartItem = {
          quantity: 10,
        };
        const { itemQuantity } = useCartItem({
          cartItem,
        } as any);

        expect(itemQuantity.value).toStrictEqual(10);
      });
    });
    describe("itemImageThumbnailUrl", () => {
      it("should invoke specific helper and return correct cover url", () => {
        const { itemImageThumbnailUrl } = useCartItem({
          cartItem: {},
        } as any);
        mockedHelpers.getProductMainImageUrl.mockReturnValue(
          "https://some.url/image.png"
        );

        expect(itemImageThumbnailUrl.value).toBe("https://some.url/image.png");
        expect(mockedHelpers.getProductMainImageUrl).toBeCalledTimes(1);
      });
    });
    describe("itemRegularPrice", () => {
      it("should return item regular price based on list price", () => {
        const cartItem = {
          price: {
            listPrice: {
              price: 59.9,
            },
          },
        };
        const { itemRegularPrice } = useCartItem({
          cartItem,
        } as any);

        expect(itemRegularPrice.value).toStrictEqual(59.9);
      });

      it("should return undefined based on list price if object does not exist", () => {
        const cartItem = {};
        const { itemRegularPrice } = useCartItem({
          cartItem,
        } as any);

        expect(itemRegularPrice.value).toBeUndefined();
      });

      it("should return item regular price based on unit price", () => {
        const cartItem = {
          price: {
            unitPrice: 59.9,
          },
        };
        const { itemRegularPrice } = useCartItem({
          cartItem,
        } as any);

        expect(itemRegularPrice.value).toStrictEqual(59.9);
      });
    });
    describe("itemSpecialPrice", () => {
      it("should return item special price", () => {
        const cartItem = {
          price: {
            listPrice: 59.9,
            unitPrice: 59.9,
          },
        };
        const { itemSpecialPrice } = useCartItem({
          cartItem,
        } as any);

        expect(itemSpecialPrice.value).toStrictEqual(59.9);
      });
      it("should return undefined instead a special price if listprice or price does not exist", () => {
        const cartItem = {
          price: {
            listPrice: undefined,
          },
        };
        const { itemSpecialPrice } = useCartItem({
          cartItem,
        } as any);

        expect(itemSpecialPrice.value).toBeUndefined();
      });
      it("should return undefined instead a special price if listprice or price does not exist", () => {
        const cartItem = {
          price: undefined,
        };
        const { itemSpecialPrice } = useCartItem({
          cartItem,
        } as any);

        expect(itemSpecialPrice.value).toBeUndefined();
      });
    });
    describe("itemStock", () => {
      it("should return stock if deliveryInformation is included in the response", () => {
        const cartItem = {
          deliveryInformation: {
            stock: 123,
          },
        };
        const { itemStock } = useCartItem({
          cartItem,
        } as any);

        expect(itemStock.value).toBe(123);
      });
      it("should return undefined if deliveryInformation is not included in the response", () => {
        const cartItem = {
          deliveryInformation: undefined,
        };
        const { itemStock } = useCartItem({
          cartItem,
        } as any);

        expect(itemStock.value).toBeUndefined();
      });
    });
    describe("itemOptions", () => {
      it("should return product options if item has product type", () => {
        const cartItem = {
          payload: {
            options: ["option-1"],
          },
          type: "product",
        };
        const { itemOptions } = useCartItem({
          cartItem,
        } as any);

        expect(itemOptions.value).toStrictEqual(["option-1"]);
      });

      it("should return an empty array if item is not in product type", () => {
        const cartItem = {
          payload: {
            options: ["option-1"],
          },
          type: "promotion",
        };
        const { itemOptions } = useCartItem({
          cartItem,
        } as any);

        expect(itemOptions.value).toStrictEqual([]);
      });

      it("should return an empty array if item has no payload object", () => {
        const cartItem = {
          payload: undefined,
          type: "product",
        };
        const { itemOptions } = useCartItem({
          cartItem,
        } as any);

        expect(itemOptions.value).toStrictEqual([]);
      });
    });

    describe("itemType", () => {
      it("should return item type", () => {
        const cartItem = {
          type: "promotion",
        };
        const { itemType } = useCartItem({
          cartItem,
        } as any);

        expect(itemType.value).toStrictEqual("promotion");
      });
    });
    describe("isProduct", () => {
      it("should return true in case if item type is a product", () => {
        const cartItem = {
          type: "product",
        };
        const { isProduct } = useCartItem({
          cartItem,
        } as any);

        expect(isProduct.value).toStrictEqual(true);
      });
    });

    describe("isPromotion", () => {
      it("should return true in case if item type is a promotion", () => {
        const cartItem = {
          type: "promotion",
        };
        const { isPromotion } = useCartItem({
          cartItem,
        } as any);

        expect(isPromotion.value).toStrictEqual(true);
      });
    });
  });
  describe("methods", () => {
    describe("removeItem", () => {
      it("should invoke removeCartItem from @shopware-pwa/shopware-6-client package", async () => {
        const { removeItem } = useCartItem({
          cartItem: {
            id: "itemId",
            referencedId: "itemId",
          } as any,
        });
        await removeItem();
        expect(mockedShopwareClient.removeCartItem).toBeCalledWith(
          "itemId",
          expect.any(Function)
        );
      });
    });
    describe("changeItemQuantity", () => {
      it("should invoke changeCartItemQuantity from @shopware-pwa/shopware-6-client package", async () => {
        const { changeItemQuantity } = useCartItem({
          cartItem: {
            id: "itemId",
            referencedId: "itemId",
          } as any,
        });
        await changeItemQuantity(5);
        expect(mockedShopwareClient.changeCartItemQuantity).toBeCalledWith(
          "itemId",
          5,
          expect.any(Function)
        );
      });
    });
    describe("getProductItemSeoUrlData", () => {
      it("should invoke getProducts from @shopware-pwa/shopware-6-client package", async () => {
        const { getProductItemSeoUrlData } = useCartItem({
          cartItem: {
            id: "itemId",
            referencedId: "itemId",
          } as any,
        });
        await getProductItemSeoUrlData();
        expect(mockedShopwareClient.getProduct).toBeCalledWith(
          "itemId",
          {
            associations: { seoUrls: {} },
            includes: { product: ["id", "seoUrls"], seo_url: ["seoPathInfo"] },
          },
          expect.any(Function)
        );
      });
      it("should not invoke getProducts method in case the referencedId does not exist", async () => {
        const { getProductItemSeoUrlData } = useCartItem({
          cartItem: {
            id: "itemId",
          } as any,
        });
        await getProductItemSeoUrlData();
        expect(mockedShopwareClient.getProduct).not.toBeCalled();
      });
    });

    describe("getProductQtySteps", () => {
      it("should return product qty", async () => {
        const cartItem = {
          quantityInformation: {
            purchaseSteps: 10,
            maxPurchase: 90000,
          },
        };
        const { getProductQtySteps } = useCartItem({
          cartItem,
        } as any);

        expect(getProductQtySteps.value).toStrictEqual([10, 20, 30, 40, 50]);
      });

      it("should return product qty - product stock", async () => {
        const cartItem = {
          quantityInformation: {
            purchaseSteps: 10,
            maxPurchase: 40,
          },
        };
        const { getProductQtySteps } = useCartItem({
          cartItem,
        } as any);

        expect(getProductQtySteps.value).toStrictEqual([10, 20, 30, 40]);
      });

      it("should return null", async () => {
        const cartItem = {
          quantityInformation: {
            maxPurchase: 90000,
          },
        };

        const { getProductQtySteps } = useCartItem({
          cartItem,
        } as any);

        expect(getProductQtySteps.value).toBe(null);
      });
    });
  });
});
