import { ref, Ref, computed } from "vue-demi";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import {
  useCart,
  INTERCEPTOR_KEYS,
  useIntercept,
  IInterceptorCallbackFunction,
  ApplicationVueContext,
  getApplicationContext,
} from "@shopware-pwa/composables";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

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
   * Returns product count in available stock
   */
  getAvailableStock: Ref<number | null>;
  /**
   * Flag if product is already in cart
   */
  isInCart: Ref<boolean>;
  /**
   * React on product added to cart
   */
  onAddToCart: (
    fn: (params: { product: Product; quantity: Number }) => void
  ) => void;
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
export function useAddToCart(
  rootContext: ApplicationVueContext,
  product: Product
): IUseAddToCart {
  const { contextName } = getApplicationContext(rootContext, "useAddToCart");
  const { addProduct, cartItems } = useCart(rootContext);
  const { broadcast, intercept } = useIntercept(rootContext);
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
      broadcast(INTERCEPTOR_KEYS.ADD_TO_CART, {
        product,
        quantity: quantity.value,
      });
      quantity.value = 1;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err;
      broadcast(INTERCEPTOR_KEYS.ERROR, {
        methodName: `[${contextName}][addToCart]`,
        inputParams: {
          product,
          quantity: quantity.value,
        },
        error: err,
      });
    } finally {
      loading.value = false;
    }
  };

  const onAddToCart = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.ADD_TO_CART, fn);

  const getStock = computed(() => product && product.stock);

  const getAvailableStock = computed(() => product && product.availableStock);

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
    getAvailableStock,
    isInCart,
    onAddToCart,
  };
}
