import Vue from "vue";
import { Ref, computed, reactive } from "@vue/composition-api";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

import {
  GuestOrderParams,
  ShippingAddress,
} from "@shopware-pwa/commons/interfaces/request/GuestOrderParams";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import {
  getAvailableShippingMethods,
  getAvailablePaymentMethods,
  createGuestOrder,
  createOrder as createApiOrder,
} from "@shopware-pwa/shopware-6-client";
import {
  useUser,
  useCart,
  useSessionContext,
  INTERCEPTOR_KEYS,
  useIntercept,
  IInterceptorCallbackFunction,
} from "@shopware-pwa/composables";
import { ApplicationVueContext, getApplicationContext } from "../appContext";
import { BillingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/BillingAddress";

/**
 * interface for {@link useCheckout} composable
 *
 * @beta
 */
export interface IUseCheckout {
  /**
   * Flag isGuestOrder is true when user is not logged in
   */
  isGuestOrder: Readonly<Ref<boolean>>;
  guestOrderParams: Ref<Readonly<Partial<GuestOrderParams>>>;
  getShippingMethods: (options?: {
    forceReload: boolean;
  }) => Promise<Readonly<Ref<readonly ShippingMethod[]>>>;
  shippingMethods: Readonly<Ref<readonly ShippingMethod[]>>;
  getPaymentMethods: (options?: {
    forceReload: boolean;
  }) => Promise<Readonly<Ref<readonly PaymentMethod[]>>>;
  paymentMethods: Readonly<Ref<readonly PaymentMethod[]>>;
  createOrder: () => Promise<Order>;
  updateGuestOrderParams: (params: Partial<GuestOrderParams>) => void;
  shippingAddress: Readonly<Ref<ShippingAddress | undefined>>;
  billingAddress: Readonly<Ref<Partial<BillingAddress> | undefined>>;
  onOrderPlace: (fn: (params: { order: Order }) => void) => void;
}

const orderData: {
  guestOrderParams: Partial<GuestOrderParams>;
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
} = Vue.observable({
  guestOrderParams: {},
  shippingMethods: [],
  paymentMethods: [],
});

/**
 * Composable for Checkout management. Options - {@link IUseCheckout}
 *
 * @beta
 */
export const useCheckout = (
  rootContext: ApplicationVueContext
): IUseCheckout => {
  const { apiInstance, contextName } = getApplicationContext(
    rootContext,
    "useCheckout"
  );
  const { broadcast, intercept } = useIntercept(rootContext);
  const { isLoggedIn } = useUser(rootContext);
  const { refreshCart } = useCart(rootContext);
  const { sessionContext } = useSessionContext(rootContext);

  const shippingMethods: Readonly<Ref<readonly ShippingMethod[]>> = computed(
    () => orderData.shippingMethods
  );
  const paymentMethods: Readonly<Ref<readonly PaymentMethod[]>> = computed(
    () => orderData.paymentMethods
  );
  const localOrderData = reactive(orderData);
  const onOrderPlace = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.ORDER_PLACE, fn);

  const getShippingMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (shippingMethods.value.length && !forceReload) return shippingMethods;
    const shippingMethodsResponse = await getAvailableShippingMethods(
      apiInstance,
      {
        onlyAvailable: true, // depending on the context, some of them can be hidden due to applied rules describing whether a method can be available
      }
    );
    orderData.shippingMethods = shippingMethodsResponse || [];
    return shippingMethods;
  };

  const getPaymentMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (paymentMethods.value.length && !forceReload) return paymentMethods;
    const paymentMethodsResponse = await getAvailablePaymentMethods(
      apiInstance,
      {
        onlyAvailable: true, // depending on the context, some of them can be hidden due to applied rules describing whether a method can be available
      }
    );
    orderData.paymentMethods = paymentMethodsResponse || [];
    return paymentMethods;
  };

  const createOrder = async () => {
    try {
      let order;
      if (isGuestOrder.value) {
        order = await createGuestOrder(
          orderData.guestOrderParams as GuestOrderParams,
          apiInstance
        );
      } else {
        order = await createApiOrder(apiInstance);
      }
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
      await refreshCart();
    }
  };
  const isGuestOrder = computed(() => !isLoggedIn.value);

  const guestOrderParams = computed(() => localOrderData.guestOrderParams);
  const updateGuestOrderParams = (params: Partial<GuestOrderParams>): void => {
    orderData.guestOrderParams = { ...orderData.guestOrderParams, ...params };
  };

  const shippingAddress = computed(() =>
    isGuestOrder.value
      ? guestOrderParams.value.shippingAddress
      : sessionContext.value?.shippingLocation?.address
  );
  const billingAddress = computed(() =>
    isGuestOrder.value
      ? guestOrderParams.value.billingAddress
      : sessionContext.value?.customer?.activeBillingAddress
  );

  return {
    isGuestOrder,
    getPaymentMethods,
    paymentMethods,
    getShippingMethods,
    shippingMethods,
    createOrder,
    guestOrderParams,
    updateGuestOrderParams,
    shippingAddress,
    billingAddress,
    onOrderPlace,
  };
};
