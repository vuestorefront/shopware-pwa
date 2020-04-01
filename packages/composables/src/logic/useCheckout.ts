import { Ref, computed } from "@vue/composition-api";
// import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { useUser } from "@shopware-pwa/composables";
// import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

/**
 * @alpha
 */
export interface UseCheckout {
  customerData: Ref<any>; // salutationId, name, surname, email - only for guest order
  shippingAddress: Ref<any>; // only for guest order
  billingAddress: Ref<any>; // only for guest order
  // shippingMethod: Ref<any>; // set by setShippingMethod and compute to get this - NOT implement by now
  // paymentMethod: Ref<any>; // set by setPaymentMethod and compute to get this - NOT implement by now
  isGuestOrder: Readonly<Ref<boolean>>;
  // getShippingMethods()
  // getPaymentMethods()
  // setShippingMethod({}) --> todo
  // setPaymentMethod({}) --> todo
  // createOrder() -> todo
}

/**
 * @alpha
 */
export const useCheckout = (): UseCheckout => {
  const { isLoggedIn } = useUser();
  // const loading: Ref<boolean> = ref(false);
  // const error: Ref<any> = ref(null);

  const isGuestOrder = computed(() => !isLoggedIn.value);

  return {
    isGuestOrder,
  };
};
