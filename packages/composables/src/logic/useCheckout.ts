import { computed, UnwrapRef, reactive, ComputedRef } from "vue-demi";
import {
  ShippingAddress,
  ShippingMethod,
  PaymentMethod,
  ClientApiError,
  CreateOrderParams,
  Order,
  BillingAddress,
} from "@shopware-pwa/commons/interfaces";
import {
  getAvailableShippingMethods,
  getAvailablePaymentMethods,
  createOrder as createApiOrder,
} from "@shopware-pwa/shopware-6-client";
import {
  useCart,
  useSessionContext,
  INTERCEPTOR_KEYS,
  useIntercept,
  IInterceptorCallbackFunction,
  useSharedState,
  getApplicationContext,
} from "@shopware-pwa/composables";

/**
 * interface for {@link useCheckout} composable
 *
 * @beta
 */
export interface IUseCheckout {
  getShippingMethods: (options?: {
    forceReload: boolean;
  }) => Promise<ComputedRef<ShippingMethod[]>>;
  shippingMethods: ComputedRef<ShippingMethod[]>;
  getPaymentMethods: (options?: {
    forceReload: boolean;
  }) => Promise<ComputedRef<PaymentMethod[]>>;
  paymentMethods: ComputedRef<PaymentMethod[]>;
  createOrder: (params?: CreateOrderParams) => Promise<Order>;
  shippingAddress: ComputedRef<ShippingAddress | undefined>;
  billingAddress: ComputedRef<Partial<BillingAddress> | undefined>;
  onOrderPlace: (fn: (params: { order: Order }) => void) => void;
  loadings: UnwrapRef<{
    createOrder: boolean;
  }>;
}

/**
 * Composable for Checkout management. Options - {@link IUseCheckout}
 *
 * @beta
 */
export function useCheckout(): IUseCheckout {
  const COMPOSABLE_NAME = "useCheckout";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });
  const { broadcast, intercept } = useIntercept();
  const { refreshCart } = useCart();
  const { sessionContext } = useSessionContext();
  const { sharedRef } = useSharedState();
  const storeShippingMethods = sharedRef<ShippingMethod[]>(
    `${contextName}-ShippingMethods`
  );
  const storePaymentMethods = sharedRef<PaymentMethod[]>(
    `${contextName}-PaymentMethods`
  );
  const loadings: UnwrapRef<{
    createOrder: boolean;
  }> = reactive({
    createOrder: false,
  });

  const shippingMethods = computed(() => storeShippingMethods.value || []);
  const paymentMethods = computed(() => storePaymentMethods.value || []);
  const onOrderPlace = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.ORDER_PLACE, fn);

  const getShippingMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (shippingMethods.value.length && !forceReload) return shippingMethods;
    const response = await getAvailableShippingMethods(apiInstance, {
      onlyAvailable: true, // depending on the context, some of them can be hidden due to applied rules describing whether a method can be available
    });
    storeShippingMethods.value = response?.elements || [];
    return shippingMethods;
  };

  const getPaymentMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (paymentMethods.value.length && !forceReload) return paymentMethods;
    const response = await getAvailablePaymentMethods(apiInstance, {
      onlyAvailable: true, // depending on the context, some of them can be hidden due to applied rules describing whether a method can be available
    });
    storePaymentMethods.value = response?.elements || [];
    return paymentMethods;
  };

  const createOrder = async (params?: CreateOrderParams) => {
    try {
      loadings.createOrder = true;
      const order = await createApiOrder(params, apiInstance);

      broadcast(INTERCEPTOR_KEYS.ORDER_PLACE, {
        order,
      });

      return order;
    } catch (e) {
      const err: ClientApiError = e;
      broadcast(INTERCEPTOR_KEYS.ERROR, {
        methodName: `[${contextName}][createOrder]`,
        inputParams: {},
        error: err,
      });
      throw err;
    } finally {
      loadings.createOrder = false;
      refreshCart();
    }
  };

  const shippingAddress = computed(
    () => sessionContext.value?.shippingLocation?.address
  );
  const billingAddress = computed(
    () => sessionContext.value?.customer?.defaultBillingAddress
  );

  return {
    getPaymentMethods,
    paymentMethods,
    getShippingMethods,
    shippingMethods,
    createOrder,
    shippingAddress,
    billingAddress,
    onOrderPlace,
    loadings,
  };
}
