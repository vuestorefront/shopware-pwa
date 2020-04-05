import { Ref, computed, ref } from "@vue/composition-api";
// import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { useUser } from "@shopware-pwa/composables";
import { Customer } from "@shopware-pwa/commons/interfaces/models/checkout/customer/Customer";
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
} from "@shopware-pwa/shopware-6-client";
import { useCart } from "../hooks/useCart";
/**
 * @alpha
 */
export interface UseCheckout {
  customerData: Ref<Customer | null>; // salutationId, name, surname, email - only for guest order
  shippingAddress: Ref<ShippingAddress | null>; // only for guest order
  billingAddress: Ref<BillingAddress | null>; // only for guest order
  // shippingMethod: Ref<any>; // set by setShippingMethod and compute to get this - NOT implement by now
  // paymentMethod: Ref<any>; // set by setPaymentMethod and compute to get this - NOT implement by now
  isGuestOrder: Readonly<Ref<boolean>>;
  getShippingMethods: () => Promise<ShippingMethod[]>;
  getPaymentMethods: () => Promise<PaymentMethod[]>;
  setShippingMethod: (shippingMethod: any) => Promise<Readonly<boolean>>;
  setPaymentMethod: (paymentMethod: any) => Promise<Readonly<boolean>>;
  createOrder: () => Promise<Order>;
}

/**
 * @alpha
 */
export const useCheckout = (): UseCheckout => {
  // TODO: create useContext in order to get current ShippingMethod, PaymentMethod
  // const { shippingMethod, paymentMethod, refresh } = useContext();
  const { isLoggedIn, user } = useUser();
  const { placeOrder } = useCart();
  const shippingMethods = ref([]);

  // const loading: Ref<boolean> = ref(false);
  // const error: Ref<any> = ref(null);
  const shippingAddress: Ref<ShippingAddress | null> = ref(null);
  const billingAddress: Ref<BillingAddress | null> = ref(null);
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
    if (isGuestOrder.value) {
      console.error("CHECKOUT PLACE ORDER");
      await createGuestOrder("qwe@qwe.pl");
    } else {
      return placeOrder();
    }
  };

  // TODO: use customerData from localStorage/cookie if not logged in
  // temporarly the user from useUser is being used - but it cover only case for logged in customer
  const customerData = computed(() => user.value);
  const isGuestOrder = computed(() => !isLoggedIn.value);

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
  };
};
