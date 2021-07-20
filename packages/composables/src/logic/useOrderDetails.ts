import { computed, ComputedRef, reactive, Ref, ref, UnwrapRef } from "vue-demi";
import { ApplicationVueContext, getApplicationContext } from "../appContext";
import { useSharedState } from "@shopware-pwa/composables";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import { BillingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/BillingAddress";
import { ShippingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/ShippingAddress";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import {
  ClientApiError,
  ShopwareError,
} from "@shopware-pwa/commons/interfaces/errors/ApiError";
import {
  getCustomerOrderDetails,
  handlePayment as apiHandlePayment,
} from "@shopware-pwa/shopware-6-client";
import {
  PAGE_ORDER_SUCCESS,
  PAGE_ORDER_PAYMENT_FAILURE,
} from "@/helpers/pages";

/**
 * Composable for managing an existing order.
 *
 * @beta
 */
export function useOrderDetails(
  rootContext: ApplicationVueContext,
  order: Order
): {
  order: ComputedRef<Order | undefined | null>;
  status: ComputedRef<string | undefined>;
  total: ComputedRef<number | undefined>;
  subtotal: ComputedRef<number | undefined>;
  shippingCosts: ComputedRef<number | undefined>;
  shippingAddress: ComputedRef<ShippingAddress | undefined>;
  billingAddress: ComputedRef<BillingAddress | undefined>;
  personalDetails: ComputedRef<
    | {
        email: string;
        firstName: string;
        lastName: string;
      }
    | undefined
  >;
  isPaymentButtonLoading: Ref<boolean>;
  paymentUrl: Ref<null | string>;
  shippingMethod: ComputedRef<ShippingMethod | undefined | null>;
  paymentMethod: ComputedRef<PaymentMethod | undefined | null>;
  errors: UnwrapRef<{
    [key: string]: ShopwareError[];
  }>;
  loadOrderDetails: () => void;
  handlePayment: () => void;
} {
  const { apiInstance, routing } = getApplicationContext(
    rootContext,
    "useOrderDetails"
  );
  const { sharedRef } = useSharedState(rootContext);
  const _sharedOrder = sharedRef("sw-useOrderDetails-order", order);
  const errors: UnwrapRef<{
    loadOrderDetails: ShopwareError[];
    handlePayment: ShopwareError[];
  }> = reactive({
    loadOrderDetails: [],
    handlePayment: [],
  });
  const orderId = order?.id;

  const paymentMethod = computed(
    () => _sharedOrder.value?.transactions?.[0]?.paymentMethod
  );
  const shippingMethod = computed(
    () => _sharedOrder.value?.deliveries?.[0]?.shippingMethod
  );
  const paymentUrl = ref(null);
  const isPaymentButtonLoading = ref(false);

  const personalDetails = computed(
    () =>
      _sharedOrder.value?.orderCustomer && {
        email: _sharedOrder.value?.orderCustomer.email,
        firstName: _sharedOrder.value?.orderCustomer.firstName,
        lastName: _sharedOrder.value?.orderCustomer.lastName,
      }
  );
  const billingAddress = computed(() =>
    _sharedOrder.value?.addresses?.find(
      ({ id }) => id == _sharedOrder.value?.billingAddressId
    )
  );
  const shippingAddress = computed(
    () => _sharedOrder.value?.deliveries?.[0]?.location.address
  );

  const shippingCosts = computed(
    () => _sharedOrder.value?.shippingCosts.totalPrice
  );
  const subtotal = computed(() => _sharedOrder.value?.price.positionPrice);
  const total = computed(() => _sharedOrder.value?.price.totalPrice);
  const status = computed(() => _sharedOrder.value?.stateMachineState.name);

  const loadOrderDetails = async () => {
    try {
      _sharedOrder.value = await getCustomerOrderDetails(orderId, apiInstance);
    } catch (e) {
      const error: ClientApiError = e;
      errors.loadOrderDetails = error.messages;
    }
  };

  const handlePayment = async () => {
    try {
      const resp = await apiHandlePayment(
        orderId,
        routing.getAbsoluteUrl(`${PAGE_ORDER_SUCCESS}?orderId=${orderId}`),
        routing.getAbsoluteUrl(
          `${PAGE_ORDER_PAYMENT_FAILURE}?orderId=${orderId}`
        ),
        apiInstance
      );

      paymentUrl.value = resp.redirectUrl;
    } catch (e) {
      const error: ClientApiError = e;
      errors.handlePayment = error.messages;
    }
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
    isPaymentButtonLoading,
    paymentUrl,
    shippingMethod,
    paymentMethod,
    errors,
    loadOrderDetails,
    handlePayment,
  };
}
