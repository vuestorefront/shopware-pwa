import Vue from "vue";
import VueCompositionApi, {
  reactive,
  ref,
  computed,
  Ref,
} from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { LineItem } from "@shopware-pwa/commons/interfaces/models/checkout/cart/line-item/LineItem";
import { useCart } from "@shopware-pwa/composables";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedShopwareClient = shopwareClient as jest.Mocked<
  typeof shopwareClient
>;

describe("Composables - useCart", () => {
  const stateCart: Ref<Object | null> = ref(null);
  const stateUser: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    $store: {
      getters: reactive({
        getCart: computed(() => stateCart.value),
        getUser: computed(() => stateUser.value),
      }),
      commit: (name: string, value: any) => {
        if (name === "SET_CART") {
          stateCart.value = value;
        }
        if (name === "SET_USER") {
          stateUser.value = value;
        }
      },
    },
    $shopwareApiInstance: jest.fn(),
  };
  beforeEach(() => {
    jest.resetAllMocks();
    stateCart.value = null;
    stateUser.value = null;
  });
  describe("computed", () => {
    describe("shippingTotal", () => {
      it("should return default value 0 (zero) if cart is empty", () => {
        stateCart.value = undefined as any;
        const { shippingTotal } = useCart(rootContextMock);
        expect(shippingTotal.value).toBe(0);
      });
      it("should return default value 0 (zero) if there is no delivery in cart", () => {
        stateCart.value = {
          deliveries: undefined,
        };
        const { shippingTotal } = useCart(rootContextMock);
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
        const { shippingTotal } = useCart(rootContextMock);
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
        const { shippingTotal } = useCart(rootContextMock);
        expect(shippingTotal.value).toBe(199.5);
      });
    });
    describe("cart", () => {
      it("should be null on not loaded cart", () => {
        stateCart.value = null;
        const { cart } = useCart(rootContextMock);
        expect(cart.value).toBeNull();
      });

      it("should return a cart object", () => {
        stateCart.value = {};
        const { cart } = useCart(rootContextMock);
        expect(cart.value).toEqual({});
      });
    });

    describe("cartItems", () => {
      it("should return an empty array of cartItems", () => {
        const { cartItems } = useCart(rootContextMock);
        expect(cartItems.value).toEqual([]);
      });

      it("should return an empty array of cartItems when empty lineItems", () => {
        stateCart.value = {};
        const { cartItems } = useCart(rootContextMock);
        expect(cartItems.value).toEqual([]);
      });

      it("should return cartItems", () => {
        stateCart.value = {
          lineItems: [{ id: 1 }],
        };
        const { cartItems } = useCart(rootContextMock);
        expect(cartItems.value).toEqual([{ id: 1 }]);
      });
    });

    describe("count", () => {
      it("should show items count as 0", () => {
        const { count } = useCart(rootContextMock);
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
        const { count } = useCart(rootContextMock);
        expect(count.value).toEqual(5);
      });
    });

    describe("totalPrice", () => {
      it("should show items totalPrice as 0", () => {
        const { totalPrice } = useCart(rootContextMock);
        expect(totalPrice.value).toEqual(0);
      });

      it("should show 0 on empty price object", () => {
        stateCart.value = {
          price: {},
        };
        const { totalPrice } = useCart(rootContextMock);
        expect(totalPrice.value).toEqual(0);
      });

      it("should show correct total price", () => {
        stateCart.value = {
          price: { totalPrice: 123 },
        };
        const { totalPrice } = useCart(rootContextMock);
        expect(totalPrice.value).toEqual(123);
      });
    });
    describe("subtotal", () => {
      it("should show items totalPrice as 0", () => {
        const { subtotal } = useCart(rootContextMock);
        expect(subtotal.value).toEqual(0);
      });

      it("should show 0 on empty price object", () => {
        stateCart.value = {
          price: {},
        };
        const { subtotal } = useCart(rootContextMock);
        expect(subtotal.value).toEqual(0);
      });

      it("should show correct subtotal price", () => {
        stateCart.value = {
          price: { positionPrice: 123 },
        };
        const { subtotal } = useCart(rootContextMock);
        expect(subtotal.value).toEqual(123);
      });
    });
    describe("appliedPromotionCodes", () => {
      it("should be empty array on not loaded cart", () => {
        stateCart.value = null;
        const { appliedPromotionCodes } = useCart(rootContextMock);
        expect(appliedPromotionCodes.value).toEqual([]);
      });

      it("should return an array", () => {
        stateCart.value = {};
        const { appliedPromotionCodes } = useCart(rootContextMock);
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
        const { appliedPromotionCodes } = useCart(rootContextMock);
        expect(appliedPromotionCodes.value.length).toEqual(1);
      });
    });
  });

  describe("methods", () => {
    describe("refreshCart", () => {
      it("should correctly refresh the cart", async () => {
        const { count, refreshCart } = useCart(rootContextMock);
        expect(count.value).toEqual(0);
        mockedShopwareClient.getCart.mockResolvedValueOnce({
          lineItems: [{ quantity: 1, type: "product" }],
        } as any);
        await refreshCart();
        expect(count.value).toEqual(1);
      });

      it("should show an error when cart is not refreshed", async () => {
        const { count, refreshCart, error } = useCart(rootContextMock);
        mockedShopwareClient.getCart.mockRejectedValueOnce({
          message: "Some problem",
        });
        await refreshCart();
        expect(count.value).toEqual(0);
        expect(error.value).toEqual("Some problem");
      });
    });

    describe("addProduct", () => {
      it("should add product to cart", async () => {
        const { count, addProduct } = useCart(rootContextMock);
        expect(count.value).toEqual(0);
        mockedShopwareClient.addProductToCart.mockResolvedValueOnce({
          lineItems: [{ quantity: 1, type: "product" }],
        } as any);
        await addProduct({ id: "qwe" });
        expect(count.value).toEqual(1);
      });

      it("should add product with quantity", async () => {
        const { addProduct } = useCart(rootContextMock);
        mockedShopwareClient.addProductToCart.mockResolvedValueOnce({} as any);
        await addProduct({ id: "qwe", quantity: 5 });
        expect(mockedShopwareClient.addProductToCart).toBeCalledWith(
          "qwe",
          5,
          rootContextMock.$shopwareApiInstance
        );
      });
    });

    describe("removeProduct", () => {
      it("should add product to cart", async () => {
        const { count, removeProduct } = useCart(rootContextMock);
        stateCart.value = {
          lineItems: [{ quantity: 3, type: "product" }],
        };
        expect(count.value).toEqual(3);
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce({
          lineItems: [],
        } as any);
        await removeProduct({ id: "qwe" });
        expect(count.value).toEqual(0);
      });

      it("should invoke client with correct params", async () => {
        const { removeProduct } = useCart(rootContextMock);
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce({} as any);
        await removeProduct({ id: "qwe" });
        expect(mockedShopwareClient.removeCartItem).toBeCalledWith(
          "qwe",
          rootContextMock.$shopwareApiInstance
        );
      });
    });

    describe("addPromotionCode", () => {
      it("should add promotion code to cart", async () => {
        const { appliedPromotionCodes, addPromotionCode } = useCart(
          rootContextMock
        );
        expect(appliedPromotionCodes.value).toEqual([]);
        mockedShopwareClient.addPromotionCode.mockResolvedValueOnce({
          lineItems: [{ quantity: 1, type: "promotion" }],
        } as any);
        await addPromotionCode("test-code");
        expect(appliedPromotionCodes.value.length).toEqual(1);
      });
    });

    describe("removeItem", () => {
      it("should remove promotion code from cart", async () => {
        const { appliedPromotionCodes, removeItem } = useCart(rootContextMock);
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

      it("should invoke client with correct params", async () => {
        const { removeProduct } = useCart(rootContextMock);
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce({} as any);
        await removeProduct({ id: "qwe" });
        expect(mockedShopwareClient.removeCartItem).toBeCalledWith(
          "qwe",
          rootContextMock.$shopwareApiInstance
        );
      });
    });

    describe("changeProductQuantity", () => {
      it("should change product quantity in cart", async () => {
        const { count, changeProductQuantity } = useCart(rootContextMock);
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
        const { changeProductQuantity } = useCart(rootContextMock);
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
  });
});
