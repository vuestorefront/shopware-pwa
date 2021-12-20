import { ref, Ref } from "vue-demi";

import { LineItem } from "@shopware-pwa/commons/interfaces";
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

import { useCart } from "../src/hooks/useCart";

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
  describe("computed", () => {
    describe("cartErrors", () => {
      it("should return default value [] (empty array) if cart is empty", () => {
        stateCart.value = undefined as any;
        const { cartErrors } = useCart();
        expect(cartErrors.value).toStrictEqual([]);
      });
      it("should return array of {EntityError} typed Objects", () => {
        stateCart.value = {
          errors: {
            "error-1": {
              key: "error-1",
            },
            "error-2": {
              key: "error-2",
            },
          },
        } as any;
        const { cartErrors } = useCart();
        expect(cartErrors.value).toStrictEqual([
          {
            key: "error-1",
          },
          {
            key: "error-2",
          },
        ]);
      });
    }),
      describe("shippingTotal", () => {
        it("should return default value 0 (zero) if cart is empty", () => {
          stateCart.value = undefined as any;
          const { shippingTotal } = useCart();
          expect(shippingTotal.value).toBe(0);
        });
        it("should return default value 0 (zero) if there is no delivery in cart", () => {
          stateCart.value = {
            deliveries: undefined,
          };
          const { shippingTotal } = useCart();
          expect(shippingTotal.value).toBe(0);
        });
        it("should return default value 0 (zero) if shipping costs are empty", () => {
          stateCart.value = {
            deliveries: [
              {
                shippingCosts: undefined,
              },
            ],
          };
          const { shippingTotal } = useCart();
          expect(shippingTotal.value).toBe(0);
        });
        it("should return total price from shipping cost of the first delivery from cart", () => {
          stateCart.value = {
            deliveries: [
              {
                shippingCosts: {
                  totalPrice: 199.5,
                },
              },
            ],
          };
          const { shippingTotal } = useCart();
          expect(shippingTotal.value).toBe(199.5);
        });
      });
    describe("cart", () => {
      it("should be null on not loaded cart", () => {
        stateCart.value = null;
        const { cart } = useCart();
        expect(cart.value).toBeNull();
      });

      it("should return a cart object", () => {
        stateCart.value = {};
        const { cart } = useCart();
        expect(cart.value).toEqual({});
      });
    });

    describe("cartItems", () => {
      it("should return an empty array of cartItems", () => {
        const { cartItems } = useCart();
        expect(cartItems.value).toEqual([]);
      });

      it("should return an empty array of cartItems when empty lineItems", () => {
        stateCart.value = {};
        const { cartItems } = useCart();
        expect(cartItems.value).toEqual([]);
      });

      it("should return cartItems", () => {
        stateCart.value = {
          lineItems: [{ id: 1 }],
        };
        const { cartItems } = useCart();
        expect(cartItems.value).toEqual([{ id: 1 }]);
      });
    });

    describe("count", () => {
      it("should show items count as 0", () => {
        const { count } = useCart();
        expect(count.value).toEqual(0);
      });

      it("should show correct items quantity", () => {
        stateCart.value = {
          lineItems: [
            { quantity: 2, type: "product" },
            { quantity: 3, type: "product" },
            { quantity: 1, type: "promotion" },
          ],
        };
        const { count } = useCart();
        expect(count.value).toEqual(5);
      });
    });

    it("should return loading state", () => {
      const { loading } = useCart();
      expect(loading.value).toEqual(false);
    });

    describe("totalPrice", () => {
      it("should show items totalPrice as 0", () => {
        const { totalPrice } = useCart();
        expect(totalPrice.value).toEqual(0);
      });

      it("should show 0 on empty price object", () => {
        stateCart.value = {
          price: {},
        };
        const { totalPrice } = useCart();
        expect(totalPrice.value).toEqual(0);
      });

      it("should show correct total price", () => {
        stateCart.value = {
          price: { totalPrice: 123 },
        };
        const { totalPrice } = useCart();
        expect(totalPrice.value).toEqual(123);
      });
    });
    describe("subtotal", () => {
      it("should show items totalPrice as 0", () => {
        const { subtotal } = useCart();
        expect(subtotal.value).toEqual(0);
      });

      it("should show 0 on empty price object", () => {
        stateCart.value = {
          price: {},
        };
        const { subtotal } = useCart();
        expect(subtotal.value).toEqual(0);
      });

      it("should show correct subtotal price", () => {
        stateCart.value = {
          price: { positionPrice: 123 },
        };
        const { subtotal } = useCart();
        expect(subtotal.value).toEqual(123);
      });
    });
    describe("appliedPromotionCodes", () => {
      it("should be empty array on not loaded cart", () => {
        stateCart.value = null;
        const { appliedPromotionCodes } = useCart();
        expect(appliedPromotionCodes.value).toEqual([]);
      });

      it("should return an array", () => {
        stateCart.value = {};
        const { appliedPromotionCodes } = useCart();
        expect(appliedPromotionCodes.value).toEqual([]);
      });

      it("should return only promotion items", () => {
        stateCart.value = {
          lineItems: [
            { quantity: 2, type: "product" },
            { quantity: 3, type: "product" },
            { quantity: 1, type: "promotion" },
          ],
        };
        const { appliedPromotionCodes } = useCart();
        expect(appliedPromotionCodes.value.length).toEqual(1);
      });
    });
  });

  describe("methods", () => {
    describe("refreshCart", () => {
      it("should correctly refresh the cart", async () => {
        const { count, refreshCart } = useCart();
        expect(count.value).toEqual(0);
        mockedShopwareClient.getCart.mockResolvedValueOnce({
          lineItems: [{ quantity: 1, type: "product" }],
        } as any);
        await refreshCart();
        expect(count.value).toEqual(1);
      });

      it("should show an error when cart is not refreshed", async () => {
        const { count, refreshCart, error } = useCart();
        mockedShopwareClient.getCart.mockRejectedValueOnce({
          messages: [{ detail: "Some problem" }],
        });
        await refreshCart();
        expect(count.value).toEqual(0);
        expect(error.value).toEqual([{ detail: "Some problem" }]);
      });
    });

    describe("addProduct", () => {
      it("should add product to cart", async () => {
        const { count, addProduct } = useCart();
        expect(count.value).toEqual(0);
        mockedShopwareClient.addProductToCart.mockResolvedValueOnce({
          lineItems: [{ quantity: 1, type: "product" }],
        } as any);
        await addProduct({ id: "qwe" });
        expect(count.value).toEqual(1);
      });

      it("should add product with quantity", async () => {
        const { addProduct } = useCart();
        mockedShopwareClient.addProductToCart.mockResolvedValueOnce({} as any);
        await addProduct({ id: "qwe", quantity: 5 });
        expect(mockedShopwareClient.addProductToCart).toBeCalledWith(
          "qwe",
          5,
          rootContextMock.$shopwareApiInstance
        );
      });
    });

    describe("removeItem", () => {
      it("should add product to cart", async () => {
        const { count, removeItem } = useCart();
        stateCart.value = {
          lineItems: [{ quantity: 3, type: "product" }],
        };
        expect(count.value).toEqual(3);
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce({
          lineItems: [],
        } as any);
        await removeItem({ id: "qwe" } as LineItem);
        expect(count.value).toEqual(0);
      });

      it("should invoke client with correct params", async () => {
        const { removeItem } = useCart();
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce({} as any);
        await removeItem({ id: "qwe" } as LineItem);
        expect(mockedShopwareClient.removeCartItem).toBeCalledWith(
          "qwe",
          rootContextMock.$shopwareApiInstance
        );
      });

      it("should remove promotion code from cart", async () => {
        const { appliedPromotionCodes, removeItem } = useCart();
        stateCart.value = {
          lineItems: [{ quantity: 1, type: "promotion" }],
        };
        expect(appliedPromotionCodes.value.length).toEqual(1);
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce({
          lineItems: [],
        } as any);
        await removeItem({ id: "qwe" } as LineItem);
        expect(appliedPromotionCodes.value.length).toEqual(0);
      });
    });
    describe("submitPromotionCode", () => {
      it("should execute the addPromotionCode method if promotion code is not falsy", async () => {
        const { addPromotionCode } = useCart();
        await addPromotionCode("PROMO-CODE-123!");
        mockedShopwareClient.addPromotionCode.mockResolvedValueOnce({
          lineItems: [{ quantity: 1, type: "promotion" }],
        } as any);
        expect(mockedShopwareClient.addPromotionCode).toBeCalledTimes(1);
      });
      it("should not execute the addPromotionCode method if promotion code is undefined or null", async () => {
        const { addPromotionCode } = useCart();
        await addPromotionCode(undefined as any);
        expect(mockedShopwareClient.addPromotionCode).toBeCalledTimes(0);
      });
    });
    describe("addPromotionCode", () => {
      it("should add promotion code to cart", async () => {
        const { appliedPromotionCodes, addPromotionCode } = useCart();
        expect(appliedPromotionCodes.value).toEqual([]);
        mockedShopwareClient.addPromotionCode.mockResolvedValueOnce({
          lineItems: [{ quantity: 1, type: "promotion" }],
        } as any);
        await addPromotionCode("test-code");
        expect(appliedPromotionCodes.value.length).toEqual(1);
      });
    });

    describe("changeProductQuantity", () => {
      it("should change product quantity in cart", async () => {
        const { count, changeProductQuantity } = useCart();
        stateCart.value = {
          lineItems: [{ quantity: 3, type: "product" }],
        };
        expect(count.value).toEqual(3);
        mockedShopwareClient.changeCartItemQuantity.mockResolvedValueOnce({
          lineItems: [{ quantity: 7, type: "product" }],
        } as any);
        await changeProductQuantity({ id: "qwer", quantity: 7 });
        expect(count.value).toEqual(7);
      });

      it("should correctly invoke changing product quantity", async () => {
        const { changeProductQuantity } = useCart();
        mockedShopwareClient.changeCartItemQuantity.mockResolvedValueOnce(
          {} as any
        );
        await changeProductQuantity({ id: "qwerty", quantity: 6 });
        expect(mockedShopwareClient.changeCartItemQuantity).toBeCalledWith(
          "qwerty",
          6,
          rootContextMock.$shopwareApiInstance
        );
      });
    });
    describe("broadcastUpcomingErrors", () => {
      it("should catch the exception while the errors are trying to be broadcasted", async () => {
        const { addProduct } = useCart();
        mockedShopwareClient.addProductToCart.mockResolvedValueOnce({
          errors: {
            "error-1": {
              key: "some-error-key",
            },
          },
        } as any);
        mockedErrorHandler.broadcastErrors.mockImplementation(() => {
          throw new Error("An error occured");
        });
        await addProduct({ id: "someId", quantity: 1 });
        expect(consoleErrorSpy).toBeCalledWith(
          "[useCart][broadcastUpcomingErrors]",
          expect.any(Object)
        );
      });
      it("should not invoke broadcastErrors helper when there is no new cart result - changeCartItemQuantity", async () => {
        const { changeProductQuantity } = useCart();
        mockedShopwareClient.changeCartItemQuantity.mockResolvedValueOnce(
          undefined as any
        );
        await changeProductQuantity({ id: "qwerty", quantity: 6 });
        expect(mockedErrorHandler.broadcastErrors).toBeCalledTimes(0);
      });
      it("should not invoke broadcastErrors helper when there is no new cart result - addProduct", async () => {
        const { addProduct } = useCart();
        mockedShopwareClient.addProductToCart.mockResolvedValueOnce(
          undefined as any
        );
        await addProduct({ id: "qwerty", quantity: 6 });
        expect(mockedErrorHandler.broadcastErrors).toBeCalledTimes(0);
      });
      it("should not invoke broadcastErrors helper when there is no new cart result - removeItem", async () => {
        const { removeItem } = useCart();
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce(
          undefined as any
        );
        await removeItem({ referencedId: "qwerty" } as any);
        expect(mockedErrorHandler.broadcastErrors).toBeCalledTimes(0);
      });
      it("should invoke broadcastErrors helper once there is a new error in cart response", async () => {
        const { removeItem } = useCart();
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce({
          errors: {
            "error-id": {
              id: "error-id",
              name: "product stock reached",
              quantity: 55,
              message: "too many products added to cart",
              code: 0,
              key: "product-stock-reached-productId",
              level: 10,
              messageKey: "product-stock-reached",
            },
          },
        } as any);
        await removeItem({ referencedId: "qwerty" } as any);
        expect(mockedErrorHandler.broadcastErrors).toBeCalledTimes(1);
      });
    });
    describe("getProductItemsSeoUrlsData", () => {
      it("should execute the getProducts method if getProductItemsSeoUrlsData is invoked and there are items", async () => {
        stateCart.value = {
          lineItems: [
            { quantity: 3, type: "product", referencedId: "some-item-id" },
          ],
        };
        const { getProductItemsSeoUrlsData } = useCart();
        await getProductItemsSeoUrlsData();
        mockedShopwareClient.getProducts.mockResolvedValueOnce({
          elements: [{ quantity: 1, type: "product" }],
        } as any);
        expect(mockedShopwareClient.getProducts).toBeCalledWith(
          {
            includes: {
              product: ["id", "seoUrls"],
              seo_url: ["seoPathInfo"],
            },
            associations: {
              seoUrls: {},
            },
            ids: ["some-item-id"],
          },
          expect.any(Function)
        );
      });
      it("should not execute the getProducts method if getProductItemsSeoUrlsData is invoked and there are no items", async () => {
        stateCart.value = {
          lineItems: [],
        };
        const { getProductItemsSeoUrlsData } = useCart();
        await getProductItemsSeoUrlsData();
        mockedShopwareClient.getProducts.mockResolvedValueOnce({
          elements: [{ quantity: 1, type: "product" }],
        } as any);
        expect(mockedShopwareClient.getProducts).not.toBeCalled();
      });
      it("should return an empty array the response from getProducts endpoint does not contain any data", async () => {
        stateCart.value = {
          lineItems: [
            { quantity: 3, type: "product", referencedId: "some-item-id" },
          ],
        };
        const { getProductItemsSeoUrlsData } = useCart();
        mockedShopwareClient.getProducts.mockResolvedValueOnce({
          elements: null,
        } as any);
        const response = await getProductItemsSeoUrlsData();
        expect(response).toStrictEqual([]);
      });
      it("should return an empty array if rejection occured on api-client level", async () => {
        stateCart.value = {
          lineItems: [
            { quantity: 3, type: "product", referencedId: "some-item-id" },
          ],
        };
        const { getProductItemsSeoUrlsData } = useCart();
        mockedShopwareClient.getProducts.mockRejectedValueOnce({
          messages: ["error"],
        });
        const response = await getProductItemsSeoUrlsData();
        expect(consoleErrorSpy).toBeCalledWith(
          "[useCart][getProductItemsSeoUrlsData]",
          ["error"]
        );
        expect(response).toStrictEqual([]);
      });
    });
  });
});
