import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import * as composables from "@shopware-pwa/composables";
const { useAddToCart } = composables;

describe("Composables - useAddToCart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("computed", () => {
    describe("getStock", () => {
      it("should return null when no product", () => {
        const { getStock } = useAddToCart(null as any);
        expect(getStock.value).toBeNull();
      });

      it("should return null when no product stock", () => {
        const { getStock } = useAddToCart({ stock: null } as any);
        expect(getStock.value).toBeNull();
      });

      it("should return a proper product stock", () => {
        const { getStock } = useAddToCart({ stock: 22 } as any);
        expect(getStock.value).toEqual(22);
      });
    });
  });

  describe("methods", () => {
    describe("addToCart", () => {
      it("should add product without quantity to cart", async () => {
        let addProductMock = jest.fn().mockResolvedValueOnce(null);
        jest.spyOn(composables, "useCart").mockImplementation(
          jest.fn().mockReturnValue({
            addProduct: addProductMock
          })
        );

        const { addToCart, error, quantity } = useAddToCart({
          id: "qwe"
        } as any);
        quantity.value = null as any;
        await addToCart();
        expect(error.value).toBeNull();
        expect(addProductMock).toBeCalledWith({ id: "qwe", quantity: 1 });
        expect(quantity.value).toEqual(1);
      });

      it("should add product with quantity to cart and reset quantity", async () => {
        let addProductMock = jest.fn().mockResolvedValueOnce(null);
        jest.spyOn(composables, "useCart").mockImplementation(
          jest.fn().mockReturnValue({
            addProduct: addProductMock
          })
        );

        const { addToCart, error, quantity } = useAddToCart({
          id: "qwe"
        } as any);
        quantity.value = 4;
        await addToCart();
        expect(error.value).toBeNull();
        expect(addProductMock).toBeCalledWith({ id: "qwe", quantity: 4 });
        expect(quantity.value).toEqual(1);
      });

      it("should contain error message when product cannot be added", async () => {
        let addProductMock = jest.fn().mockRejectedValueOnce("Error message");
        jest.spyOn(composables, "useCart").mockImplementation(
          jest.fn().mockReturnValue({
            addProduct: addProductMock
          })
        );

        const { addToCart, error, quantity } = useAddToCart({
          id: "qwe"
        } as any);
        quantity.value = 4;
        await addToCart();
        expect(error.value).toEqual("Error message");
        expect(addProductMock).toBeCalledWith({ id: "qwe", quantity: 4 });
        expect(quantity.value).toEqual(4);
      });

      it("should not try add to cart on empty product", async () => {
        let addProductMock = jest.fn().mockResolvedValueOnce(null);
        jest.spyOn(composables, "useCart").mockImplementation(
          jest.fn().mockReturnValue({
            addProduct: addProductMock
          })
        );

        const { addToCart, error, quantity } = useAddToCart(null as any);
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
