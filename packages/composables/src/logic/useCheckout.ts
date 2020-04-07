import Vue from "vue";
import { Ref, computed } from "@vue/composition-api";
import { useUser } from "@shopware-pwa/composables";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { GuestOrderParams } from "@shopware-pwa/commons/interfaces/request/GuestOrderParams";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import {
  getAvailableShippingMethods,
  getAvailablePaymentMethods,
  createGuestOrder,
} from "@shopware-pwa/shopware-6-client";
import { useCart } from "../hooks/useCart";

/**
 * @alpha
 */
export interface UseCheckout {
  guestOrderParams: Ref<Readonly<Partial<GuestOrderParams | null>>>; // salutationId, name, surname, email - only for guest order
  // shippingData: Ref<ShippingData | null>; // only for guest order
  // billingData: Ref<BillingData | null>; // only for guest order
  // shippingMethod: Ref<any>; // set by setShippingMethod and compute to get this - NOT implement by now
  // paymentMethod: Ref<any>; // set by setPaymentMethod and compute to get this - NOT implement by now
  isGuestOrder: Readonly<Ref<boolean>>;
  getShippingMethods: () => Promise<ShippingMethod[]>;
  getPaymentMethods: () => Promise<PaymentMethod[]>;
  // setShippingMethod: (shippingMethod: any) => Promise<Readonly<boolean>>;
  // setPaymentMethod: (paymentMethod: any) => Promise<Readonly<boolean>>;
  createOrder: () => Promise<Order>;
}

const orderData: {
  guestOrderParams: Partial<GuestOrderParams>;
} = Vue.observable({
  guestOrderParams: {},
});

/**
 * @alpha
 */
export const useCheckout = (): UseCheckout => {
  const { isLoggedIn } = useUser();
  const { placeOrder, refreshCart } = useCart();

  const getShippingMethods = async () => {
    const shippingMethodsResponse = await getAvailableShippingMethods();
    return shippingMethodsResponse.data || [];
  };

  const getPaymentMethods = async () => {
    const paymentMethodsResponse = await getAvailablePaymentMethods();
    return paymentMethodsResponse.data || [];
  };

  const createOrder = async () => {
    // used from useCart; or move the logic here.
    // important thing is to update context/cart under the hood and then just place an order using one shot :)
    try {
      if (isGuestOrder.value) {
        console.error("CHECKOUT PLACE ORDER", orderData.guestOrderParams);
        // console.error("CHECKOUT PLACE shipping", orderData.shippingData);
        // console.error("CHECKOUT PLACE billling", orderData.billingData);

        // const shippingAddress = {
        //   ...(orderData?.shippingData || {}),
        //   salutationId: orderData?.customerData?.salutationId,
        // };
        // const guestOrder = {
        //   ...(orderData?.customerData || {}),
        //   shippingAddress: shippingAddress,
        //   billingAddress: orderData?.billingData?.differentThanShipping
        //     ? orderData.billingData
        //     : shippingAddress,
        // };
        try {
          await createGuestOrder(
            orderData.guestOrderParams as GuestOrderParams
          );
        } catch (e) {
          console.error("ERROR PLACING GUEST ORDER", e);
        }
      } else {
        return placeOrder();
      }
    } catch (e) {
      console.error("PROBLEM WITH PLACING ORDER", e);
    } finally {
      await refreshCart();
    }
  };
  const isGuestOrder = computed(() => !isLoggedIn.value);

  const guestOrderParams = computed({
    get: () => orderData.guestOrderParams,
    set: (val) => (orderData.guestOrderParams = val),
  });

  return {
    isGuestOrder,
    getPaymentMethods,
    getShippingMethods,
    createOrder,
    guestOrderParams,
  };
};
