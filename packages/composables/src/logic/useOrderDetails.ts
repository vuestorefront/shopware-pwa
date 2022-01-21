import {
  computed,
  ComputedRef,
  reactive,
  Ref,
  ref,
  unref,
  UnwrapRef,
} from "vue-demi";
import {
  useSharedState,
  useDefaults,
  INTERCEPTOR_KEYS,
  getApplicationContext,
  useIntercept,
} from "@shopware-pwa/composables";
import {
  Order,
  BillingAddress,
  ShippingAddress,
  ShippingMethod,
  PaymentMethod,
  ClientApiError,
  ShopwareError,
} from "@shopware-pwa/commons/interfaces";
import {
  cancelOrder,
  changeOrderPaymentMethod,
  getOrderDetails,
  handlePayment as apiHandlePayment,
} from "@shopware-pwa/shopware-6-client";

/**
 * Composable for managing an existing order.
 *
 * @beta
 */
export function useOrderDetails(params: { order: Ref<Order> | Order }): {
  order: ComputedRef<Order | undefined | null>;
  status: ComputedRef<string | undefined>;
  total: ComputedRef<number | undefined>;
  subtotal: ComputedRef<number | undefined>;
  shippingCosts: ComputedRef<number | undefined>;
  shippingAddress: ComputedRef<ShippingAddress | undefined>;
  billingAddress: ComputedRef<BillingAddress | undefined>;
  personalDetails: ComputedRef<{
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
  }>;
  paymentUrl: Ref<null | string>;
  shippingMethod: ComputedRef<ShippingMethod | undefined | null>;
  paymentMethod: ComputedRef<PaymentMethod | undefined | null>;
  errors: UnwrapRef<{
    [key: string]: ShopwareError[];
  }>;
  loaders: UnwrapRef<{
    [key: string]: boolean;
  }>;
  loadOrderDetails: () => void;
  handlePayment: (
    successUrl?: string,
    errorUrl?: string,
    paymentDetails?: unknown
  ) => void;
  cancel: () => Promise<void>;
  changePaymentMethod: (paymentMethodId: string) => Promise<void>;
} {
  const COMPOSABLE_NAME = "useOrderDetails";
  const contextName = COMPOSABLE_NAME;

  const order = unref(params.order);

  const { apiInstance } = getApplicationContext({ contextName });
  const { getDefaults } = useDefaults({ defaultsKey: contextName });
  const { broadcast } = useIntercept();
  const { sharedRef } = useSharedState();
  const _sharedOrder = sharedRef(`sw-${contextName}-order`, order);
  const errors: UnwrapRef<{
    loadOrderDetails: ShopwareError[];
    handlePayment: ShopwareError[];
    cancel: ShopwareError[];
    changePaymentMethod: ShopwareError[];
  }> = reactive({
    loadOrderDetails: [],
    handlePayment: [],
    cancel: [],
    changePaymentMethod: [],
  });
  const loaders: UnwrapRef<{
    loadOrderDetails: boolean;
    handlePayment: boolean;
    cancel: boolean;
    changePaymentMethod: boolean;
  }> = reactive({
    loadOrderDetails: false,
    handlePayment: false,
    cancel: false,
    changePaymentMethod: false,
  });
  const orderId = order?.id;

  const paymentMethod = computed(
    () => _sharedOrder.value?.transactions?.[0]?.paymentMethod
  );
  const shippingMethod = computed(
    () => _sharedOrder.value?.deliveries?.[0]?.shippingMethod
  );
  const paymentUrl = ref();

  const personalDetails = computed(() => ({
    email: _sharedOrder.value?.orderCustomer?.email,
    firstName: _sharedOrder.value?.orderCustomer?.firstName,
    lastName: _sharedOrder.value?.orderCustomer?.lastName,
  }));
  const billingAddress = computed(() =>
    _sharedOrder.value?.addresses?.find(
      ({ id }) => id === (_sharedOrder.value as Order).billingAddressId
    )
  );
  const shippingAddress = computed(
    () => _sharedOrder.value?.deliveries?.[0]?.location?.address
  );

  const shippingCosts = computed(
    () => _sharedOrder.value?.shippingCosts?.totalPrice
  );
  const subtotal = computed(() => _sharedOrder.value?.price?.positionPrice);
  const total = computed(() => _sharedOrder.value?.price?.totalPrice);
  const status = computed(() => _sharedOrder.value?.stateMachineState?.name);

  /**
   * Get order object including additional associations.
   * useDefaults describes what order object should look like.
   */
  const loadOrderDetails = async () => {
    loaders.loadOrderDetails = true;
    try {
      const orderDetailsResponse = await getOrderDetails(
        orderId,
        getDefaults(),
        apiInstance
      );
      _sharedOrder.value = orderDetailsResponse ?? null;
      broadcast(INTERCEPTOR_KEYS.ORDER_DETAILS_LOADED, _sharedOrder.value);
    } catch (e) {
      const error: ClientApiError = e;
      errors.loadOrderDetails = error.messages;
      broadcast(INTERCEPTOR_KEYS.ERROR, error);
    }
    loaders.loadOrderDetails = false;
  };

  /**
   * Handle payment for existing error.
   *
   * Pass custom success and error URLs (optionally).
   */
  const handlePayment = async (finishUrl?: string, errorUrl?: string, paymentDetails?: unknown) => {
    loaders.handlePayment = true;
    try {
      const resp = await apiHandlePayment({
        orderId,
        finishUrl,
        errorUrl,
        paymentDetails,
      },
      apiInstance,
      );

      paymentUrl.value = resp?.redirectUrl;
      broadcast(INTERCEPTOR_KEYS.ORDER_HANDLE_PAYMENT, resp);
    } catch (e) {
      const error: ClientApiError = e;
      errors.handlePayment = error.messages;
      broadcast(INTERCEPTOR_KEYS.ERROR, error);
    }
    loaders.handlePayment = false;
  };

  /**
   * Cancel an order.
   * Action cannot be reverted.
   */
  const cancel = async (): Promise<void> => {
    loaders.cancel = true;
    try {
      const response = await cancelOrder(orderId, apiInstance);
      broadcast(INTERCEPTOR_KEYS.ORDER_CANCELLED, response);
    } catch (error) {
      errors.cancel = error.messages;
      broadcast(INTERCEPTOR_KEYS.ERROR, error);
    }
    loaders.cancel = false;
    await loadOrderDetails();
  };
  const changePaymentMethod = async (
    paymentMethodId: string
  ): Promise<void> => {
    loaders.changePaymentMethod = true;
    try {
      await changeOrderPaymentMethod(orderId, paymentMethodId, apiInstance);
      broadcast(INTERCEPTOR_KEYS.ORDER_PAYMENT_METHOD_CHANGED, order);
    } catch (error) {
      errors.changePaymentMethod = error.messages;
      broadcast(INTERCEPTOR_KEYS.ERROR, error);
    }

    loaders.changePaymentMethod = false;

    await loadOrderDetails();
  };

  return {
    order: computed(() => _sharedOrder.value),
    status,
    total,
    subtotal,
    shippingCosts,
    shippingAddress,
    billingAddress,
    personalDetails,
    paymentUrl,
    shippingMethod,
    paymentMethod,
    errors,
    loaders,
    loadOrderDetails,
    handlePayment,
    cancel,
    changePaymentMethod,
  };
}
