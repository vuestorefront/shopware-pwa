import Vue from "vue";
import VueCompositionApi, {
  reactive,
  ref,
  computed,
  Ref
} from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { useCart, setStore } from "@shopware-pwa/composables";
import * as shopwareClient from "@shopware-pwa/shopware-6-client";

jest.mock("@shopware-pwa/shopware-6-client");
const mockedShopwareClient = shopwareClient as jest.Mocked<
  typeof shopwareClient
>;

describe("Composables - useCart", () => {
  const stateCart: Ref<Object | null> = ref(null);
  beforeEach(() => {
    // mock vuex store
    jest.resetAllMocks();
    stateCart.value = null;
    setStore({
      getters: reactive({ getCart: computed(() => stateCart.value) }),
      commit: (name: string, value: any) => {
        stateCart.value = value;
      }
    });
  });
  describe("computed", () => {
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
          lineItems: [{ id: 1 }]
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
          lineItems: [{ quantity: 2 }, { quantity: 3 }]
        };
        const { count } = useCart();
        expect(count.value).toEqual(5);
      });
    });

    describe("totalPrice", () => {
      it("should show items totalPrice as 0", () => {
        const { totalPrice } = useCart();
        expect(totalPrice.value).toEqual(0);
      });

      it("should show 0 on empty price object", () => {
        stateCart.value = {
          price: {}
        };
        const { totalPrice } = useCart();
        expect(totalPrice.value).toEqual(0);
      });

      it("should show correct total price", () => {
        stateCart.value = {
          price: { totalPrice: 123 }
        };
        const { totalPrice } = useCart();
        expect(totalPrice.value).toEqual(123);
      });
    });
  });

  describe("methods", () => {
    describe("refreshCart", () => {
      it("should correctly refresh the cart", async () => {
        const { count, refreshCart } = useCart();
        expect(count.value).toEqual(0);
        mockedShopwareClient.getCart.mockResolvedValueOnce({
          lineItems: [{ quantity: 1 }]
        } as any);
        await refreshCart();
        expect(count.value).toEqual(1);
      });

      it("should show an error when cart is not refreshed", async () => {
        const { count, refreshCart, error } = useCart();
        mockedShopwareClient.getCart.mockRejectedValueOnce("Some problem");
        await refreshCart();
        expect(count.value).toEqual(0);
        expect(error.value).toEqual("Some problem");
      });
    });

    describe("addProduct", () => {
      it("should add product to cart", async () => {
        const { count, addProduct } = useCart();
        expect(count.value).toEqual(0);
        mockedShopwareClient.addProductToCart.mockResolvedValueOnce({
          lineItems: [{ quantity: 1 }]
        } as any);
        await addProduct({ id: "qwe" });
        expect(count.value).toEqual(1);
      });

      it("should add product with quantity", async () => {
        const { addProduct } = useCart();
        mockedShopwareClient.addProductToCart.mockResolvedValueOnce({} as any);
        await addProduct({ id: "qwe", quantity: 5 });
        expect(mockedShopwareClient.addProductToCart).toBeCalledWith("qwe", 5);
      });
    });

    describe("removeProduct", () => {
      it("should add product to cart", async () => {
        const { count, removeProduct } = useCart();
        stateCart.value = {
          lineItems: [{ quantity: 3 }]
        };
        expect(count.value).toEqual(3);
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce({
          lineItems: []
        } as any);
        await removeProduct({ id: "qwe" });
        expect(count.value).toEqual(0);
      });

      it("should invoke client with correct params", async () => {
        const { removeProduct } = useCart();
        mockedShopwareClient.removeCartItem.mockResolvedValueOnce({} as any);
        await removeProduct({ id: "qwe" });
        expect(mockedShopwareClient.removeCartItem).toBeCalledWith("qwe");
      });
    });

    describe("changeProductQuantity", () => {
      it("should change product quantity in cart", async () => {
        const { count, changeProductQuantity } = useCart();
        stateCart.value = {
          lineItems: [{ quantity: 3 }]
        };
        expect(count.value).toEqual(3);
        mockedShopwareClient.changeCartItemQuantity.mockResolvedValueOnce({
          lineItems: [{ quantity: 7 }]
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
          6
        );
      });
    });
  });
});
