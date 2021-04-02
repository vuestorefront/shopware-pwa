import { ref, Ref, computed, ComputedRef } from "@vue/composition-api";
import {
  getCart,
  addProductToCart,
  addPromotionCode,
  removeCartItem,
  changeCartItemQuantity,
} from "@shopware-pwa/shopware-6-client";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { Cart } from "@shopware-pwa/commons/interfaces/models/checkout/cart/Cart";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { LineItem } from "@shopware-pwa/commons/interfaces/models/checkout/cart/line-item/LineItem";
import {
  getApplicationContext,
  INTERCEPTOR_KEYS,
  useIntercept,
  useSharedState,
} from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../../appContext";
import { deprecationWarning } from "@shopware-pwa/commons";

/**
 * interface for {@link useCart} composable
 *
 * @beta
 */
export interface IUseCart {
  addProduct: ({
    id,
    quantity,
  }: {
    id: string;
    quantity?: number;
  }) => Promise<void>;
  addPromotionCode: (promotionCode: string) => Promise<void>;
  appliedPromotionCodes: ComputedRef<LineItem[]>;
  cart: ComputedRef<Cart | null>;
  cartItems: ComputedRef<LineItem[]>;
  changeProductQuantity: ({
    id,
    quantity,
  }: {
    id: string;
    quantity: number;
  }) => void;
  count: ComputedRef<number>;
  error: ComputedRef<string>;
  loading: ComputedRef<boolean>;
  refreshCart: () => void;
  removeItem: ({ id }: LineItem) => Promise<void>;
  /**
   * @deprecated use removeItem method instead
   */
  removeProduct: ({ id }: Partial<Product>) => void;
  totalPrice: ComputedRef<number>;
  shippingTotal: ComputedRef<number>;
  subtotal: ComputedRef<number>;
}

/**
 * Composable for cart management. Options - {@link IUseCart}
 *
 * @beta
 */
export const useCart = (rootContext: ApplicationVueContext): IUseCart => {
  const { apiInstance, contextName } = getApplicationContext(
    rootContext,
    "useCart"
  );
  const { broadcast } = useIntercept(rootContext);

  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);

  const { sharedRef } = useSharedState(rootContext);
  const _storeCart = sharedRef<Cart>(`${contextName}-cart`);

  async function refreshCart(): Promise<void> {
    loading.value = true;
    try {
      const result = await getCart(apiInstance);
      _storeCart.value = result;
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
    _storeCart.value = result;
  }

  async function removeItem({ id }: LineItem) {
    const result = await removeCartItem(id, apiInstance);
    _storeCart.value = result;
  }

  // TODO: remove in 1.0
  async function removeProduct({ id }: Product) {
    deprecationWarning({
      methodName: "removeProduct",
      newMethodName: "removeItem",
      packageName: "composables",
    });
    return removeItem({ id } as LineItem);
  }

  async function changeProductQuantity({ id, quantity }: any) {
    const result = await changeCartItemQuantity(id, quantity, apiInstance);
    _storeCart.value = result;
  }

  async function submitPromotionCode(promotionCode: string) {
    if (promotionCode) {
      const result = await addPromotionCode(promotionCode, apiInstance);
      _storeCart.value = result;
      broadcast(INTERCEPTOR_KEYS.ADD_PROMOTION_CODE, {
        result,
        promotionCode,
      });
    }
  }

  const appliedPromotionCodes = computed(() => {
    return cartItems.value.filter(
      (cartItem: LineItem) => cartItem.type === "promotion"
    );
  });

  const cart: ComputedRef<Cart | null> = computed(() => _storeCart.value);

  const cartItems = computed(() => {
    return cart.value ? cart.value.lineItems || [] : [];
  });

  const count = computed(() => {
    return cartItems.value.reduce(
      (accumulator: number, lineItem: LineItem) =>
        lineItem.type === "product"
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

  const shippingTotal = computed(() => {
    const shippingTotal =
      cart.value?.deliveries?.[0]?.shippingCosts?.totalPrice;
    return shippingTotal || 0;
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
    removeItem,
    totalPrice,
    shippingTotal,
    subtotal,
  };
};
