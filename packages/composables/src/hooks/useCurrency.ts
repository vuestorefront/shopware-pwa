import Vue from "vue";
import { reactive, computed, Ref } from "@vue/composition-api";
import { getAvailableCurrencies } from "@shopware-pwa/shopware-6-client";
import { useSessionContext, useCart } from "@shopware-pwa/composables";
import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";

const sharedCurrencyState = Vue.observable({
  availableCurrencies: [],
} as any);

/**
 * @alpha
 */
export interface UseCurrency {
  loadAvailableCurrencies: (options?: {
    forceReload: boolean;
  }) => Promise<void>;
  setCurrency: (parameter: Partial<Currency>) => Promise<void>;
  availableCurrencies: Readonly<Ref<readonly Currency[]>>;
  currency: Readonly<Ref<Currency | null>>;
  currencySymbol: Ref<Readonly<string>>;
}

/**
 * @alpha
 */
export const useCurrency = (): UseCurrency => {
  const { currency, setCurrency: setContextCurrency } = useSessionContext();
  const { refreshCart } = useCart();
  const localState: { availableCurrencies: Currency[] } = reactive(
    sharedCurrencyState
  );
  const currencySymbol = computed(() => currency.value?.symbol || "");
  const availableCurrencies = computed(() => {
    if (localState.availableCurrencies.length) {
      return localState.availableCurrencies as Currency[];
    }
    return currency.value ? [currency.value] : [];
  });

  const loadAvailableCurrencies = async (options?: {
    forceReload: boolean;
  }): Promise<void> => {
    if (!options?.forceReload && localState.availableCurrencies.length) return;
    const currencies = await getAvailableCurrencies();
    sharedCurrencyState.availableCurrencies = currencies;
  };

  const setCurrency = async (currency: Partial<Currency>): Promise<void> => {
    try {
      await setContextCurrency(currency);
      refreshCart();
    } catch (e) {
      console.error(
        "[useCurrency][setCurrency] Problem with currency change",
        e
      );
    }
  };

  return {
    loadAvailableCurrencies,
    setCurrency,
    availableCurrencies,
    currencySymbol,
    currency,
  };
};
