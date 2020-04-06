import Vue from "vue";
import { Ref, computed, ref, onMounted } from "@vue/composition-api";
// import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { useUser } from "@shopware-pwa/composables";
import { ShippingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/ShippingAddress";
import { BillingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/BillingAddress";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import {
  setCurrentShippingMethod,
  setCurrentPaymentMethod,
  getAvailableShippingMethods,
  getAvailablePaymentMethods,
  createGuestOrder,
  getCurrentPaymentMethod,
  getCurrentShippingMethod,
} from "@shopware-pwa/shopware-6-client";
import { useCart } from "../hooks/useCart";

export interface CustomerData {
  salutationId: string;
  email: string;
  firstName: string;
  lastName: string;
  isValid: boolean;
}
export interface ShippingData extends ShippingAddress {
  isValid: boolean;
}

export interface BillingData extends BillingAddress {
  differentThanShipping: boolean;
  isValid: boolean;
}
/**
 * @alpha
 */
export interface UseCheckout {
  customerData: Ref<CustomerData | null>; // salutationId, name, surname, email - only for guest order
  shippingData: Ref<ShippingData | null>; // only for guest order
  billingData: Ref<BillingData | null>; // only for guest order
  // shippingMethod: Ref<any>; // set by setShippingMethod and compute to get this - NOT implement by now
  // paymentMethod: Ref<any>; // set by setPaymentMethod and compute to get this - NOT implement by now
  isGuestOrder: Readonly<Ref<boolean>>;
  getShippingMethods: () => Promise<ShippingMethod[]>;
  getPaymentMethods: () => Promise<PaymentMethod[]>;
  setShippingMethod: (shippingMethod: any) => Promise<Readonly<boolean>>;
  setPaymentMethod: (paymentMethod: any) => Promise<Readonly<boolean>>;
  createOrder: () => Promise<Order>;
}

// export interface CreateGuestOrderParams {
//   email: string;
//   salutationId: string;
//   firstName: string;
//   lastName: string;
//   billingAddress: BillingAddress;
//   shippingAddress?: ShippingAddress | null | undefined;
//   affiliateCode?: string;
//   campaignCode?: string;
//   phoneNumber?: string;
// }

const orderData: any = Vue.observable({
  customerData: null,
  shippingData: null,
  billingData: null,
});

/**
 * @alpha
 */
export const useCheckout = (): UseCheckout => {
  // TODO: create useContext in order to get current ShippingMethod, PaymentMethod
  // const { shippingMethod, paymentMethod, refresh } = useContext();
  const currentShippingMethod: Ref<ShippingMethod | null> = ref(null);
  const currentPaymentMethod: Ref<PaymentMethod | null> = ref(null);

  const { isLoggedIn, user } = useUser();
  const { placeOrder, refreshCart } = useCart();
  const shippingMethods = ref([]);

  // const loading: Ref<boolean> = ref(false);
  // const error: Ref<any> = ref(null);
  const shippingAddress: Ref<ShippingAddress | null> = ref(null);
  const billingAddress: Ref<BillingAddress | null> = ref(null);

  const getShippingMethod = async (): Promise<void> => {
    try {
      currentShippingMethod.value = await getCurrentShippingMethod();
    } catch (e) {
      console.error("useCheckout:getShippingMethod", e);
    }
  };
  const getPaymentMethod = async (): Promise<void> => {
    try {
      currentPaymentMethod.value = await getCurrentPaymentMethod();
    } catch (e) {
      console.error("useCheckout:getPaymentMethod", e);
    }
  };

  const getShippingMethods = async () => {
    // use map to mark the current session's selected method
    // or just export the shippingMethod and paymentMethod as a composable property and do the marking logic (on dropdown to preselect active) in theme
    // same thing in payment methods
    const shippingMethodsResponse = await getAvailableShippingMethods();
    shippingMethods.value = shippingMethodsResponse.data;
  };

  const getPaymentMethods = async () => {
    const paymentMethodsResponse = await getAvailablePaymentMethods();
    return paymentMethodsResponse.data || [];
  };

  const setShippingMethod = async (
    shippingMethodId: string
  ): Promise<Readonly<boolean>> => {
    try {
      await setCurrentShippingMethod(shippingMethodId);
      return true;
    } catch (e) {
      console.error("useCheckout:setShippingMethod", e);
    }
    return false;
  };

  const setPaymentMethod = async ({
    id: paymentMethodId,
  }: PaymentMethod): Promise<Readonly<boolean>> => {
    try {
      await setCurrentPaymentMethod(paymentMethodId);
      return true;
    } catch (e) {
      console.error("useCheckout:setPaymentMethod", e);
    }
    return false;
  };

  const createOrder = async () => {
    // used from useCart; or move the logic here.
    // important thing is to update context/cart under the hood and then just place an order using one shot :)
    try {
      if (isGuestOrder.value) {
        console.error("CHECKOUT PLACE ORDER", orderData.customerData);
        console.error("CHECKOUT PLACE shipping", orderData.shippingData);
        console.error("CHECKOUT PLACE billling", orderData.billingData);

        const shippingAddress = {
          ...(orderData?.shippingData || {}),
          salutationId: orderData?.customerData?.salutationId,
        };
        const guestOrder = {
          ...(orderData?.customerData || {}),
          shippingAddress: shippingAddress,
          billingAddress: orderData?.billingData?.differentThanShipping
            ? orderData.billingData
            : shippingAddress,
        };
        try {
          await createGuestOrder(guestOrder);
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

  // TODO: use customerData from localStorage/cookie if not logged in
  // temporarly the user from useUser is being used - but it cover only case for logged in customer
  // const customerData = computed(() => user.value);
  const isGuestOrder = computed(() => !isLoggedIn.value);

  // onMounted(() => {
  //   getShippingMethod();
  // })

  const customerData = computed({
    get: () => orderData.customerData,
    set: (val) => (orderData.customerData = val),
  });
  const shippingData = computed({
    get: () => orderData.shippingData,
    set: (val) => (orderData.shippingData = val),
  });
  const billingData = computed({
    get: () => orderData.billingData,
    set: (val) => (orderData.billingData = val),
  });

  return {
    customerData,
    isGuestOrder,
    billingAddress,
    shippingAddress,
    getPaymentMethods,
    getShippingMethods,
    setPaymentMethod,
    setShippingMethod,
    createOrder,
    shippingMethods: computed(() => shippingMethods.value),
    paymentMethod: computed(() => currentPaymentMethod.value),
    shippingMethod: computed(() => currentShippingMethod.value),
    getCurrentShippingMethod,
    customerData,
    shippingData,
    billingData,
  };
};
