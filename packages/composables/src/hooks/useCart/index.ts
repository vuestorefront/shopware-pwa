import { ref, Ref, computed, ComputedRef } from "@vue/composition-api";
import {
  getCart,
  addProductToCart,
  addPromotionCode,
  removeCartItem,
  changeCartItemQuantity,
} from "@shopware-pwa/shopware-6-client";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { CartItemType } from "@shopware-pwa/commons/interfaces/cart/CartItemType";
import { Cart } from "@shopware-pwa/commons/interfaces/models/checkout/cart/Cart";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { LineItem } from "@shopware-pwa/commons/interfaces/models/checkout/cart/line-item/LineItem";
import {
  getApplicationContext,
  INTERCEPTOR_KEYS,
  useIntercept,
} from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../../appContext";

/**
 * interface for {@link useCart} composable
 *
 * @beta
 */
export interface IUseCart {
  addProduct: ({ id, quantity }: { id: string; quantity?: number }) => void;
  addPromotionCode: (promoCode: string) => Promise<void>;
  appliedPromotionCodes: ComputedRef<LineItem[]>;
  cart: Readonly<Ref<Readonly<Cart>>>;
  cartItems: Readonly<Ref<Readonly<LineItem[]>>>;
  changeProductQuantity: ({
    id,
    quantity,
  }: {
    id: string;
    quantity: number;
  }) => void;
  count: Readonly<Ref<Readonly<number>>>;
  error: Readonly<Ref<Readonly<string>>>;
  loading: Readonly<Ref<Readonly<boolean>>>;
  refreshCart: () => void;
  removeProduct: ({ id }: Partial<Product>) => void;
  removePromotionCode: ({ id }: Partial<Product>) => Promise<void>;
  totalPrice: Readonly<Ref<Readonly<number>>>;
  subtotal: Readonly<Ref<Readonly<number>>>;
}

/**
 * Composable for cart management. Options - {@link IUseCart}
 *
 * @beta
 */
export const useCart = (rootContext: ApplicationVueContext): IUseCart => {
  const { vuexStore, apiInstance } = getApplicationContext(
    rootContext,
    "useCart"
  );
  const { broadcast } = useIntercept(rootContext);

  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);

  async function refreshCart(): Promise<void> {
    loading.value = true;
    try {
      const result = await getCart(apiInstance);
      vuexStore.commit("SET_CART", result);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function addProduct({
    id,
    quantity,
  }: {
    id: string;
    quantity?: number;
  }) {
    const result = await addProductToCart(id, quantity, apiInstance);
    vuexStore.commit("SET_CART", result);
  }

  async function removeProduct({ id }: Product) {
    const result = await removeCartItem(id, apiInstance);
    vuexStore.commit("SET_CART", result);
  }

  async function changeProductQuantity({ id, quantity }: any) {
    const result = await changeCartItemQuantity(id, quantity, apiInstance);
    vuexStore.commit("SET_CART", result);
  }

  async function submitPromotionCode(promoCode: string) {
    try {
      const result = await addPromotionCode(promoCode, apiInstance);
      vuexStore.commit("SET_CART", result);
      broadcast(INTERCEPTOR_KEYS.ADD_PROMOTION_CODE, {
        result,
        promoCode,
      });
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    }
  }

  async function removePromotionCode(lineItem: Product) {
    await removeProduct(lineItem);
  }

  const appliedPromotionCodes = computed(() => {
    return cartItems.value.filter(
      (cartItem) => cartItem.type === CartItemType.PROMOTION
    );
  });

  const cart: Readonly<Ref<Readonly<Cart>>> = computed(() => {
    return vuexStore.getters.getCart;
  });

  const cartItems = computed(() => {
    return cart.value ? cart.value.lineItems || [] : [];
  });

  const count = computed(() => {
    return cartItems.value.reduce(
      (accumulator: number, lineItem: LineItem) =>
        lineItem.type === CartItemType.PRODUCT
          ? lineItem.quantity + accumulator
          : accumulator,
      0
    );
  });

  const totalPrice = computed(() => {
    const cartPrice =
      cart.value && cart.value.price && cart.value.price.totalPrice;
    return cartPrice || 0;
  });

  const subtotal = computed(() => {
    const cartPrice = cart.value?.price?.positionPrice;
    return cartPrice || 0;
  });

  return {
    addProduct,
    addPromotionCode: submitPromotionCode,
    appliedPromotionCodes,
    cart,
    cartItems,
    changeProductQuantity,
    count,
    error,
    loading,
    refreshCart,
    removeProduct,
    removePromotionCode,
    totalPrice,
    subtotal,
  };
};
