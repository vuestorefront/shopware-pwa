import { computed, ComputedRef } from "vue-demi";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";
import { ShippingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/ShippingAddress";
import { BillingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/BillingAddress";

import {
  getSessionContext,
  setCurrentShippingMethod,
  setCurrentCurrency,
  setCurrentPaymentMethod,
  setCurrentShippingAddress,
  setCurrentBillingAddress,
} from "@shopware-pwa/shopware-6-client";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";
import {
  getApplicationContext,
  INTERCEPTOR_KEYS,
  useIntercept,
  IInterceptorCallbackFunction,
  useSharedState,
  ApplicationVueContext,
} from "@shopware-pwa/composables";
/**
 * interface for {@link useSessionContext} composable
 *
 * @remarks
 * SessionContext contain all related data like user, currency, country, shippingMethod, paymentMethod etc.
 *
 * @beta
 */
export interface IUseSessionContext {
  sessionContext: ComputedRef<SessionContext | null>;
  refreshSessionContext: () => Promise<void>;
  shippingMethod: ComputedRef<ShippingMethod | null>;
  setShippingMethod: (shippingMethod: Partial<ShippingMethod>) => Promise<void>;
  paymentMethod: ComputedRef<PaymentMethod | null>;
  setPaymentMethod: (paymentMethod: Partial<PaymentMethod>) => Promise<void>;
  currency: ComputedRef<Currency | null>;
  setCurrency: (currency: Partial<Currency>) => Promise<void>;
  activeShippingAddress: ComputedRef<ShippingAddress | null>;
  setActiveShippingAddress: (
    address: Partial<ShippingAddress>
  ) => Promise<void>;
  activeBillingAddress: ComputedRef<BillingAddress | null>;
  setActiveBillingAddress: (address: Partial<BillingAddress>) => Promise<void>;
  countryId: ComputedRef<string | undefined>;
  // events for interceptors
  onCurrencyChange: (fn: (params: { currency: Currency }) => void) => void;
  onPaymentMethodChange: (
    fn: (params: { paymentMethod: PaymentMethod }) => void
  ) => void;
  onShippingMethodChange: (
    fn: (params: { shippingMethod: ShippingMethod }) => void
  ) => void;
}

/**
 * Composable for session management. Options - {@link IUseSessionContext}
 *
 * @beta
 */
export function useSessionContext(
  rootContext: ApplicationVueContext
): IUseSessionContext {
  const { apiInstance } = getApplicationContext(
    rootContext,
    "useSessionContext"
  );
  const { broadcast, intercept } = useIntercept(rootContext);

  const { sharedRef } = useSharedState(rootContext);
  const storeSessionContext = sharedRef<SessionContext>(
    `useSessionContext-sessionContext`
  );

  const onCurrencyChange = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.SESSION_SET_CURRENCY, fn);
  const onPaymentMethodChange = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.SESSION_SET_PAYMENT_METHOD, fn);
  const onShippingMethodChange = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.SESSION_SET_SHIPPING_METHOD, fn);

  const sessionContext = computed(() => storeSessionContext.value);
  const refreshSessionContext = async () => {
    try {
      const context = await getSessionContext(apiInstance);
      storeSessionContext.value = context;
    } catch (e) {
      console.error("[UseSessionContext][refreshSessionContext]", e);
    }
  };

  const shippingMethod = computed(
    () => sessionContext.value?.shippingMethod || null
  );
  const setShippingMethod = async (
    shippingMethod: Partial<ShippingMethod> = {}
  ) => {
    if (!shippingMethod?.id) {
      throw new Error(
        "You need to provide shipping method id in order to set shipping method."
      );
    }
    await setCurrentShippingMethod(shippingMethod.id, apiInstance);
    await refreshSessionContext();
    broadcast(INTERCEPTOR_KEYS.SESSION_SET_SHIPPING_METHOD, {
      shippingMethod,
    });
  };

  const paymentMethod = computed(
    () => sessionContext.value?.paymentMethod || null
  );
  const setPaymentMethod = async (
    paymentMethod: Partial<PaymentMethod> = {}
  ) => {
    if (!paymentMethod?.id) {
      throw new Error(
        "You need to provide payment method id in order to set payment method."
      );
    }
    await setCurrentPaymentMethod(paymentMethod.id, apiInstance);
    await refreshSessionContext();
    broadcast(INTERCEPTOR_KEYS.SESSION_SET_PAYMENT_METHOD, {
      paymentMethod,
    });
  };

  const currency = computed(() => sessionContext.value?.currency || null);
  const setCurrency = async (currency: Partial<Currency> = {}) => {
    if (!currency.id) {
      console.error(
        "You need to provide currency id in order to set currency.",
        currency
      );
      return;
    }
    await setCurrentCurrency(currency.id, apiInstance);
    await refreshSessionContext();
    broadcast(INTERCEPTOR_KEYS.SESSION_SET_CURRENCY, {
      currency,
    });
  };

  const activeShippingAddress = computed(
    () => sessionContext.value?.customer?.activeShippingAddress || null
  );
  const setActiveShippingAddress = async (
    address: Partial<ShippingAddress>
  ) => {
    if (!address?.id) {
      throw new Error(
        "You need to provide address id in order to set the address."
      );
    }
    await setCurrentShippingAddress(address.id, apiInstance);
    refreshSessionContext();
  };

  const activeBillingAddress = computed(
    () => sessionContext.value?.customer?.activeBillingAddress || null
  );
  const setActiveBillingAddress = async (address: Partial<BillingAddress>) => {
    if (!address?.id) {
      throw new Error(
        "You need to provide address id in order to set the address."
      );
    }
    await setCurrentBillingAddress(address.id, apiInstance);
    refreshSessionContext();
  };

  const countryId = computed(
    () => sessionContext.value?.salesChannel?.countryId
  );

  return {
    sessionContext,
    refreshSessionContext,
    shippingMethod,
    setShippingMethod,
    paymentMethod,
    setPaymentMethod,
    currency,
    setCurrency,
    activeShippingAddress,
    setActiveShippingAddress,
    activeBillingAddress,
    setActiveBillingAddress,
    countryId,
    // interceptors
    onCurrencyChange,
    onPaymentMethodChange,
    onShippingMethodChange,
  };
}
