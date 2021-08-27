import { Ref, ref } from "vue-demi";

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;
import { useAddToCart } from "../src/logic/useAddToCart";
import { prepareRootContextMock } from "./contextRunner";

describe("Composables - useAddToCart", () => {
  const stateCart: Ref<Object | null> = ref(null);
  const addProductMock = jest.fn(async () => {});
  const pushErrorMock = jest.fn(() => {});
  const pushSuccessMock = jest.fn(() => {});
  const cartItemsMock: Ref<any[]> = ref([]);
  const rootContextMock = prepareRootContextMock({
    contextName: "useAddToCart",
  });

  const interceptMock = jest.fn();
  const broadcastMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    stateCart.value = null;
    cartItemsMock.value = [];
    mockedComposables.useNotifications.mockImplementation(() => {
      return {
        pushError: pushErrorMock,
        pushSuccess: pushSuccessMock,
      } as any;
    });
    mockedComposables.useCart.mockImplementation(() => {
      return {
        addProduct: addProductMock,
        cartItems: cartItemsMock,
      } as any;
    });
    mockedComposables.useIntercept.mockImplementation(() => {
      return {
        broadcast: broadcastMock,
        intercept: interceptMock,
      } as any;
    });

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);
  });

  describe("computed", () => {
    describe("getStock", () => {
      it("should return null when no product", () => {
        const { getStock } = useAddToCart({ product: null as any });
        expect(getStock.value).toBeNull();
      });

      it("should return null when no product stock", () => {
        const { getStock } = useAddToCart({
          product: {
            stock: null,
          } as any,
        });
        expect(getStock.value).toBeNull();
      });

      it("should return a proper product stock", () => {
        const { getStock } = useAddToCart({
          product: {
            stock: 22,
          } as any,
        });
        expect(getStock.value).toEqual(22);
      });
    });

    describe("getAvailableStock", () => {
      it("should return null when no product", () => {
        const { getAvailableStock } = useAddToCart({ product: null as any });
        expect(getAvailableStock.value).toBeNull();
      });

      it("should return null when no product available stock", () => {
        const { getAvailableStock } = useAddToCart({
          product: {
            availableStock: null,
          } as any,
        });
        expect(getAvailableStock.value).toBeNull();
      });

      it("should return a proper product available stock", () => {
        const { getAvailableStock } = useAddToCart({
          product: {
            availableStock: 21,
          } as any,
        });
        expect(getAvailableStock.value).toEqual(21);
      });
    });

    describe("isInCart", () => {
      it("should show that product is in cart", () => {
        cartItemsMock.value = [{ referencedId: "qwe" }];
        const { isInCart } = useAddToCart({
          product: {
            id: "qwe",
          } as any,
        });
        expect(isInCart.value).toBeTruthy();
      });

      it("should show that product is not cart", () => {
        stateCart.value = {
          lineItems: [{ referencedId: "qwert" }],
        };
        const { isInCart } = useAddToCart({
          product: {
            id: "qwe",
          } as any,
        });
        expect(isInCart.value).toBeFalsy();
      });
    });
  });

  describe("methods", () => {
    describe("addToCart", () => {
      it("should add product without quantity to cart", async () => {
        const { addToCart, error, quantity } = useAddToCart({
          product: {
            id: "qwe",
          } as any,
        });
        quantity.value = null as any;
        await addToCart();
        expect(error.value).toBeNull();
        expect(addProductMock).toBeCalledWith({ id: "qwe", quantity: 1 });
        expect(quantity.value).toEqual(1);
      });

      it("should add product with quantity to cart and reset quantity", async () => {
        const { addToCart, error, quantity } = useAddToCart({
          product: {
            id: "qwe",
          } as any,
        });
        quantity.value = 4;
        await addToCart();
        expect(error.value).toBeNull();
        expect(addProductMock).toBeCalledWith({ id: "qwe", quantity: 4 });
        expect(quantity.value).toEqual(1);
      });

      it("should contain error message when product cannot be added", async () => {
        addProductMock.mockRejectedValueOnce("Error message");

        const { addToCart, error, quantity } = useAddToCart({
          product: {
            id: "qwe",
          } as any,
        });
        quantity.value = 4;
        await addToCart();
        expect(error.value).toEqual("Error message");
        expect(addProductMock).toBeCalledWith({ id: "qwe", quantity: 4 });
        expect(quantity.value).toEqual(4);
      });

      it("should not try add to cart on empty product", async () => {
        const { addToCart, error, quantity } = useAddToCart({
          product: null as any,
        });
        quantity.value = 4;
        await addToCart();
        expect(error.value).toEqual(
          "Product has to be passed as a composable argument and needs to have an id property."
        );
        expect(addProductMock).not.toBeCalled();
        expect(quantity.value).toEqual(4);
      });

      it("should broadcast message after success", async () => {
        const { addToCart } = useAddToCart({
          product: {
            id: "qwe",
          } as any,
        });
        await addToCart();
        expect(broadcastMock).toBeCalledWith("addToCart", {
          product: { id: "qwe" },
          quantity: 1,
        });
      });

      it("should broadcast error message in case of error", async () => {
        addProductMock.mockRejectedValueOnce("Error message");

        const { addToCart } = useAddToCart({
          product: {
            id: "qwe",
          } as any,
        });
        await addToCart();
        expect(broadcastMock).toBeCalledWith("error", {
          methodName: "[useAddToCart][addToCart]",
          inputParams: {
            product: {
              id: "qwe",
            },
            quantity: 1,
          },
          error: "Error message",
        });
      });
    });

    describe("onAddToCart", () => {
      it("should add interceptor method", () => {
        const { onAddToCart } = useAddToCart({ product: null as any });
        onAddToCart(() => {});
        expect(interceptMock).toHaveBeenCalledWith(
          "addToCart",
          expect.any(Function)
        );
      });
    });
  });
});
