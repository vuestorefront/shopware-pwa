import { Ref, computed } from "@vue/composition-api";
import { getStore } from "@shopware-pwa/composables";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";
import {
  getSessionContext,
  setCurrentShippingMethod,
  setCurrentCurrency,
} from "@shopware-pwa/shopware-6-client";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";

/**
 * Simple session management.
 * SessionContext contain all related data like user, currency, country, shippingMethod, paymentMethod etc.
 * @alpha
 */
export interface UseSessionContext {
  sessionContext: Readonly<Ref<SessionContext | null>>;
  refreshSessionContext: () => Promise<void>;
  shippingMethod: Readonly<Ref<ShippingMethod | null>>;
  setShippingMethod: (shippingMethod: Partial<ShippingMethod>) => Promise<void>;
  currency: Readonly<Ref<Currency | null>>;
  setCurrency: (currency: Partial<Currency>) => Promise<void>;
}

/**
 * @alpha
 */
export const useSessionContext = (): UseSessionContext => {
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

  const currency = computed(() => sessionContext.value?.currency || null);
  const setCurrency = async (currency: Partial<Currency> = {}) => {
    if (!currency.id) {
      throw new Error(
        "You need to provide currency id in order to set currency."
      );
    }
    await setCurrentCurrency(currency.id);
    await refreshSessionContext();
  };

  return {
    sessionContext,
    refreshSessionContext,
    shippingMethod,
    setShippingMethod,
    currency,
    setCurrency,
  };
};
