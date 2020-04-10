import { Ref, computed } from "@vue/composition-api";
import { getStore } from "@shopware-pwa/composables";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import {
  getSessionContext,
  setCurrentShippingMethod,
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
  shippingMethod: Readonly<Ref<ShippingMethod>>;
  setShippingMethod: (shippingMethod: Partial<ShippingMethod>) => Promise<void>;
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
        "You need to provige shipping method id in order to set shipping method."
      );
    }
    await setCurrentShippingMethod(shippingMethod.id);
  };

  return {
    sessionContext,
    refreshSessionContext,
    shippingMethod,
    setShippingMethod,
  };
};
