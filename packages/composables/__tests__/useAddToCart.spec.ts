import Vue from "vue";
import VueCompositionApi, {
  Ref,
  reactive,
  computed,
  ref,
} from "@vue/composition-api";
Vue.use(VueCompositionApi);

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import { useAddToCart } from "../src/logic/useAddToCart";

describe("Composables - useAddToCart", () => {
  const stateCart: Ref<Object | null> = ref(null);
  const addProductMock = jest.fn(async () => {});
  const cartItemsMock: Ref<any[]> = ref([]);
  const rootContextMock: any = {
    $store: {
      getters: reactive({ getCart: computed(() => stateCart.value) }),
      commit: (name: string, value: any) => {
        stateCart.value = value;
      },
    },
    $shopwareApiInstance: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    stateCart.value = null;
    cartItemsMock.value = [];
    mockedComposables.useCart.mockImplementation(() => {
      return {
        addProduct: addProductMock,
        cartItems: cartItemsMock,
      } as any;
    });
  });

  describe("computed", () => {
    describe("getStock", () => {
      it("should return null when no product", () => {
        const { getStock } = useAddToCart(rootContextMock, null as any);
        expect(getStock.value).toBeNull();
      });

      it("should return null when no product stock", () => {
        const { getStock } = useAddToCart(rootContextMock, {
          stock: null,
        } as any);
        expect(getStock.value).toBeNull();
      });

      it("should return a proper product stock", () => {
        const { getStock } = useAddToCart(rootContextMock, {
          stock: 22,
        } as any);
        expect(getStock.value).toEqual(22);
      });
    });

    describe("isInCart", () => {
      it("should show that product is in cart", () => {
        cartItemsMock.value = [{ id: "qwe" }];
        const { isInCart } = useAddToCart(rootContextMock, {
          id: "qwe",
        } as any);
        expect(isInCart.value).toBeTruthy();
      });

      it("should show that product is not cart", () => {
        stateCart.value = {
          lineItems: [{ id: "qwert" }],
        };
        const { isInCart } = useAddToCart(rootContextMock, {
          id: "qwe",
        } as any);
        expect(isInCart.value).toBeFalsy();
      });
    });
  });

  describe("methods", () => {
    describe("addToCart", () => {
      it("should add product without quantity to cart", async () => {
        const { addToCart, error, quantity } = useAddToCart(rootContextMock, {
          id: "qwe",
        } as any);
        quantity.value = null as any;
        await addToCart();
        expect(error.value).toBeNull();
        expect(addProductMock).toBeCalledWith({ id: "qwe", quantity: 1 });
        expect(quantity.value).toEqual(1);
      });

      it("should add product with quantity to cart and reset quantity", async () => {
        const { addToCart, error, quantity } = useAddToCart(rootContextMock, {
          id: "qwe",
        } as any);
        quantity.value = 4;
        await addToCart();
        expect(error.value).toBeNull();
        expect(addProductMock).toBeCalledWith({ id: "qwe", quantity: 4 });
        expect(quantity.value).toEqual(1);
      });

      it("should contain error message when product cannot be added", async () => {
        addProductMock.mockRejectedValueOnce("Error message");

        const { addToCart, error, quantity } = useAddToCart(rootContextMock, {
          id: "qwe",
        } as any);
        quantity.value = 4;
        await addToCart();
        expect(error.value).toEqual("Error message");
        expect(addProductMock).toBeCalledWith({ id: "qwe", quantity: 4 });
        expect(quantity.value).toEqual(4);
      });

      it("should not try add to cart on empty product", async () => {
        const { addToCart, error, quantity } = useAddToCart(
          rootContextMock,
          null as any
        );
        quantity.value = 4;
        await addToCart();
        expect(error.value).toEqual(
          "Product has to be passed as a composable argument and needs to have an id property."
        );
        expect(addProductMock).not.toBeCalled();
        expect(quantity.value).toEqual(4);
      });
    });
  });
});
