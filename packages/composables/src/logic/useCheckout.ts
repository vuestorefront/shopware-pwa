import Vue from "vue";
import { Ref, computed } from "@vue/composition-api";
import { ShippingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/ShippingAddress";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
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
} from "@shopware-pwa/composables";
import { ApplicationVueContext, getApplicationContext } from "../appContext";
import { BillingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/BillingAddress";

/**
 * interface for {@link useCheckout} composable
 *
 * @beta
 */
export interface IUseCheckout {
  getShippingMethods: (options?: {
    forceReload: boolean;
  }) => Promise<Readonly<Ref<readonly ShippingMethod[]>>>;
  shippingMethods: Readonly<Ref<readonly ShippingMethod[]>>;
  getPaymentMethods: (options?: {
    forceReload: boolean;
  }) => Promise<Readonly<Ref<readonly PaymentMethod[]>>>;
  paymentMethods: Readonly<Ref<readonly PaymentMethod[]>>;
  createOrder: () => Promise<Order>;
  shippingAddress: Readonly<Ref<ShippingAddress | undefined>>;
  billingAddress: Readonly<Ref<Partial<BillingAddress> | undefined>>;
  onOrderPlace: (fn: (params: { order: Order }) => void) => void;
}

const orderData: {
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
} = Vue.observable({
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
  const { refreshCart } = useCart(rootContext);
  const { sessionContext } = useSessionContext(rootContext);

  const shippingMethods: Readonly<Ref<readonly ShippingMethod[]>> = computed(
    () => orderData.shippingMethods
  );
  const paymentMethods: Readonly<Ref<readonly PaymentMethod[]>> = computed(
    () => orderData.paymentMethods
  );
  const onOrderPlace = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.ORDER_PLACE, fn);

  const getShippingMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (shippingMethods.value.length && !forceReload) return shippingMethods;
    const response = await getAvailableShippingMethods(apiInstance, {
      onlyAvailable: true, // depending on the context, some of them can be hidden due to applied rules describing whether a method can be available
    });
    orderData.shippingMethods = response?.elements || [];
    return shippingMethods;
  };

  const getPaymentMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (paymentMethods.value.length && !forceReload) return paymentMethods;
    const response = await getAvailablePaymentMethods(apiInstance, {
      onlyAvailable: true, // depending on the context, some of them can be hidden due to applied rules describing whether a method can be available
    });
    orderData.paymentMethods = response?.elements || [];
    return paymentMethods;
  };

  const createOrder = async () => {
    try {
      const order = await createApiOrder(apiInstance);

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

  const shippingAddress = computed(
    () => sessionContext.value?.shippingLocation?.address
  );
  const billingAddress = computed(
    () => sessionContext.value?.customer?.activeBillingAddress
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
  };
};
