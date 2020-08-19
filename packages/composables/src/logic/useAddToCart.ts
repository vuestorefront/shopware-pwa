import { ref, Ref, computed } from "@vue/composition-api";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { useCart, getApplicationContext } from "@shopware-pwa/composables";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { ApplicationVueContext } from "../appContext";

/**
 * interface for {@link useAddToCart} composable
 * @beta
 */
export interface IUseAddToCart {
  /**
   * Add to cart method
   */
  addToCart: () => Promise<void>;
  /**
   * If you want to add more that 1 product set quantity before invoking `addToCart`
   */
  quantity: Ref<number>;
  /**
   * Adding to cart is in progress
   */
  loading: Ref<boolean>;
  /**
   * Error message when adding to cart was not successful
   */
  error: Ref<string>;
  /**
   * Returns product count in stock
   */
  getStock: Ref<number | null>;
  /**
   * Flag if product is already in cart
   */
  isInCart: Ref<boolean>;
}

/**
 * Add product to cart. Options - {@link IUseAddToCart}
 *
 * @example
 * Example of possibilities:
 *
 * ```ts
 * const {isInCart, quantity, addToCart} = useAddToCart(root, product)
 * if (!isInCart.value) {
 *    quantity.value = 5
 *    await addToCart()
 * }
 * ```
 * @beta
 */
export const useAddToCart = (
  rootContext: ApplicationVueContext,
  product: Product
): IUseAddToCart => {
  getApplicationContext(rootContext, "useAddToCart");
  const { addProduct, cartItems } = useCart(rootContext);
  const quantity: Ref<number> = ref(1);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);

  const addToCart = async (): Promise<void> => {
    if (!product || !product.id) {
      error.value =
        "Product has to be passed as a composable argument and needs to have an id property.";
      return;
    }
    loading.value = true;
    error.value = null;
    if (!quantity.value) quantity.value = 1;
    try {
      await addProduct({ id: product.id, quantity: quantity.value });
      quantity.value = 1;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const getStock = computed(() => product && product.stock);

  const isInCart = computed(
    (): boolean =>
      product &&
      cartItems.value.some((item: any) => item.referencedId === product.id)
  );

  return {
    addToCart,
    quantity,
    error,
    loading,
    getStock,
    isInCart,
  };
};
