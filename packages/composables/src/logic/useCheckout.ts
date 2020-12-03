import Vue from "vue";
import { Ref, computed, reactive } from "@vue/composition-api";
import { useUser, useCart } from "@shopware-pwa/composables";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
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
import { useSessionContext } from "@shopware-pwa/composables";
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
  const { apiInstance } = getApplicationContext(rootContext, "useCheckout");

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

  const getShippingMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (shippingMethods.value.length && !forceReload) return shippingMethods;
    const shippingMethodsResponse = await getAvailableShippingMethods(
      apiInstance
    );
    orderData.shippingMethods = shippingMethodsResponse || [];
    return shippingMethods;
  };

  const getPaymentMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (paymentMethods.value.length && !forceReload) return paymentMethods;
    const paymentMethodsResponse = await getAvailablePaymentMethods(
      apiInstance
    );
    orderData.paymentMethods = paymentMethodsResponse || [];
    return paymentMethods;
  };

  const createOrder = async () => {
    try {
      if (isGuestOrder.value) {
        return await createGuestOrder(
          orderData.guestOrderParams as GuestOrderParams,
          apiInstance
        );
      } else {
        return await createApiOrder(apiInstance);
      }
    } catch (e) {
      console.error(
        "[useCheckout][createOrder] isGuest:" + isGuestOrder.value,
        e
      );
      throw e;
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
  };
};
