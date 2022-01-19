import { ref, Ref, computed, ComputedRef } from "vue-demi";
import {
  getCart,
  addProductToCart,
  addPromotionCode,
  removeCartItem,
  changeCartItemQuantity,
  getProducts,
} from "@shopware-pwa/shopware-6-client";
import {
  ClientApiError,
  Cart,
  EntityError,
  Product,
  LineItem,
  ErrorLevel,
} from "@shopware-pwa/commons/interfaces";
import {
  getApplicationContext,
  INTERCEPTOR_KEYS,
  useDefaults,
  useIntercept,
  useSharedState,
} from "@shopware-pwa/composables";
import { broadcastErrors } from "../../internalHelpers/errorHandler";
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
  }) => Promise<Cart>;
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
  totalPrice: ComputedRef<number>;
  shippingTotal: ComputedRef<number>;
  subtotal: ComputedRef<number>;
  cartErrors: ComputedRef<EntityError[]>;
  getProductItemsSeoUrlsData(): Promise<Partial<Product>[]>;
}

/**
 * Composable for cart management. Options - {@link IUseCart}
 *
 * @beta
 */
export function useCart(): IUseCart {
  const COMPOSABLE_NAME = "useCart";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });
  const { broadcast } = useIntercept();
  const { getDefaults } = useDefaults({
    defaultsKey: COMPOSABLE_NAME,
  });

  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);

  const { sharedRef } = useSharedState();
  const _storeCart = sharedRef<Cart>(`${contextName}-cart`);

  async function refreshCart(): Promise<void> {
    loading.value = true;
    try {
      const result = await getCart(apiInstance);
      broadcastUpcomingErrors(result);
      _storeCart.value = result;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.messages;
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
  }): Promise<Cart> {
    const addToCartResult = await addProductToCart(id, quantity, apiInstance);
    broadcastUpcomingErrors(addToCartResult);
    _storeCart.value = addToCartResult;
    return addToCartResult;
  }

  async function removeItem({ id }: LineItem) {
    const result = await removeCartItem(id, apiInstance);
    broadcastUpcomingErrors(result);
    _storeCart.value = result;
  }

  async function changeProductQuantity({ id, quantity }: any) {
    const result = await changeCartItemQuantity(id, quantity, apiInstance);
    broadcastUpcomingErrors(result);
    _storeCart.value = result;
  }

  async function submitPromotionCode(promotionCode: string) {
    if (promotionCode) {
      const result = await addPromotionCode(promotionCode, apiInstance);
      broadcastUpcomingErrors(result);
      _storeCart.value = result;
      broadcast(INTERCEPTOR_KEYS.ADD_PROMOTION_CODE, {
        result,
        promotionCode,
      });
    }
  }

  function broadcastUpcomingErrors(cartResult: Cart): void {
    if (!cartResult) {
      return;
    }

    try {
      const cartErrorsKeys = Object.keys(_storeCart.value?.errors || {});
      const cartResultErrorKeys = Object.keys(cartResult.errors || {});
      const upcomingErrorsKeys = cartResultErrorKeys.filter(
        (resultErrorKey) => !cartErrorsKeys.includes(resultErrorKey)
      );
      const entityErrors: EntityError[] = Object.values(
        cartResult.errors || {}
      ).filter(
        // don't ignore ERROR level of incoming errors or if they are new
        (entityError) =>
          entityError.level === ErrorLevel.ERROR ||
          upcomingErrorsKeys.includes(entityError.key)
      );

      broadcastErrors(entityErrors, `[${contextName}][cartError]`, broadcast);
    } catch (error) {
      console.error("[useCart][broadcastUpcomingErrors]", error);
    }
  }

  async function getProductItemsSeoUrlsData(): Promise<Partial<Product>[]> {
    if (!cartItems.value.length) {
      return [];
    }

    try {
      const result = await getProducts(
        {
          ids: cartItems.value.map(
            ({ referencedId }) => referencedId
          ) as string[],
          includes: (getDefaults() as any).getProductItemsSeoUrlsData.includes,
          associations: (getDefaults() as any).getProductItemsSeoUrlsData
            .associations,
        },
        apiInstance
      );
      return result?.elements || [];
    } catch (error) {
      console.error("[useCart][getProductItemsSeoUrlsData]", error.messages);
    }

    return [];
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

  const cartErrors: ComputedRef<EntityError[]> = computed(
    () => (cart.value?.errors && Object.values(cart.value.errors)) || []
  );

  return {
    addProduct,
    addPromotionCode: submitPromotionCode,
    appliedPromotionCodes,
    cart,
    cartItems,
    changeProductQuantity,
    count,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    refreshCart,
    removeItem,
    totalPrice,
    shippingTotal,
    subtotal,
    cartErrors,
    getProductItemsSeoUrlsData,
  };
}
