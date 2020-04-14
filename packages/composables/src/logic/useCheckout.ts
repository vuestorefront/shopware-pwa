import Vue from "vue";
import { Ref, computed, reactive } from "@vue/composition-api";
import { useUser, useCart } from "@shopware-pwa/composables";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { GuestOrderParams } from "@shopware-pwa/commons/interfaces/request/GuestOrderParams";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import {
  getAvailableShippingMethods,
  getAvailablePaymentMethods,
  createGuestOrder,
  createOrder as createApiOrder,
} from "@shopware-pwa/shopware-6-client";

/**
 * @alpha
 */
export interface UseCheckout {
  isGuestOrder: Readonly<Ref<boolean>>;
  guestOrderParams: Ref<Readonly<Partial<GuestOrderParams | null>>>;
  getShippingMethods: (options?: {
    forceReload: boolean;
  }) => Promise<Readonly<Ref<readonly ShippingMethod[]>>>;
  getPaymentMethods: (options?: {
    forceReload: boolean;
  }) => Promise<Readonly<Ref<readonly PaymentMethod[]>>>;
  createOrder: () => Promise<Order>;
  updateGuestOrderParams: (params: Partial<GuestOrderParams>) => void;
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
 * @alpha
 */
export const useCheckout = (): UseCheckout => {
  const { isLoggedIn } = useUser();
  const { refreshCart } = useCart();
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
    const shippingMethodsResponse = await getAvailableShippingMethods();
    orderData.shippingMethods = shippingMethodsResponse.data || [];
    return shippingMethods;
  };

  const getPaymentMethods = async (
    { forceReload } = { forceReload: false }
  ) => {
    if (paymentMethods.value.length && !forceReload) return paymentMethods;
    const paymentMethodsResponse = await getAvailablePaymentMethods();
    orderData.paymentMethods = paymentMethodsResponse.data || [];
    return paymentMethods;
  };

  const createOrder = async () => {
    try {
      if (isGuestOrder.value) {
        return await createGuestOrder(
          orderData.guestOrderParams as GuestOrderParams
        );
      } else {
        return await createApiOrder();
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

  return {
    isGuestOrder,
    getPaymentMethods,
    getShippingMethods,
    createOrder,
    guestOrderParams,
    updateGuestOrderParams,
  };
};
