import { Ref, computed } from "@vue/composition-api";
import { getStore } from "@shopware-pwa/composables";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";
import {
  getSessionContext,
  setCurrentShippingMethod,
  setCurrentCurrency,
  setCurrentPaymentMethod,
} from "@shopware-pwa/shopware-6-client";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";

/**
 * interface for {@link useSessionContext} composable
 *
 * @remarks
 * SessionContext contain all related data like user, currency, country, shippingMethod, paymentMethod etc.
 *
 * @beta
 */
export interface IUseSessionContext {
  sessionContext: Readonly<Ref<SessionContext | null>>;
  refreshSessionContext: () => Promise<void>;
  shippingMethod: Readonly<Ref<ShippingMethod | null>>;
  setShippingMethod: (shippingMethod: Partial<ShippingMethod>) => Promise<void>;
  paymentMethod: Readonly<Ref<PaymentMethod | null>>;
  setPaymentMethod: (paymentMethod: Partial<PaymentMethod>) => Promise<void>;
  currency: Readonly<Ref<Currency | null>>;
  setCurrency: (currency: Partial<Currency>) => Promise<void>;
}

/**
 * Composable for session management. Options - {@link IUseSessionContext}
 *
 * @beta
 */
export const useSessionContext = (): IUseSessionContext => {
  let vuexStore = getStore();

  const sessionContext: Readonly<Ref<SessionContext>> = computed(() => {
    return (vuexStore.getters.getSessionContext as SessionContext) || null;
  });
  const refreshSessionContext = async () => {
    try {
      const context = await getSessionContext();
      vuexStore.commit("SET_SESSION_CONTEXT", context);
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
    await setCurrentShippingMethod(shippingMethod.id);
    await refreshSessionContext();
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
    await setCurrentPaymentMethod(paymentMethod.id);
    await refreshSessionContext();
  };

  const currency = computed(() => sessionContext.value?.currency || null);
  const setCurrency = async (currency: Partial<Currency> = {}) => {
    if (!currency.id) {
      throw new Error(
        "You need to provide currency id in order to set currency."
      );
    }
    await setCurrentCurrency(currency.id);
    refreshSessionContext();
  };

  return {
    sessionContext,
    refreshSessionContext,
    shippingMethod,
    setShippingMethod,
    paymentMethod,
    setPaymentMethod,
    currency,
    setCurrency,
  };
};
