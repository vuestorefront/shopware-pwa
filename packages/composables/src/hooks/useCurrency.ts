import { computed, Ref, ComputedRef } from "vue-demi";
import { getAvailableCurrencies } from "@shopware-pwa/shopware-6-client";
import {
  useSessionContext,
  useCart,
  useSharedState,
  getApplicationContext,
} from "@shopware-pwa/composables";
import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";

/**
 * @beta
 */
export interface IUseCurrency {
  loadAvailableCurrencies: (options?: {
    forceReload: boolean;
  }) => Promise<void>;
  setCurrency: (parameter: Partial<Currency>) => Promise<void>;
  availableCurrencies: ComputedRef<Currency[]>;
  currency: ComputedRef<Currency | null>;
  currencySymbol: ComputedRef<string>;
}

/**
 * @beta
 */
export function useCurrency(): IUseCurrency {
  const COMPOSABLE_NAME = "useCurrency";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });
  const { sharedRef } = useSharedState();
  const _availableCurrencies: Ref<Currency[] | null> = sharedRef(
    `sw-${contextName}-availableCurrencies`
  );

  const { currency, setCurrency: setContextCurrency } = useSessionContext();
  const { refreshCart } = useCart();
  const currencySymbol = computed(() => currency.value?.symbol || "");
  const availableCurrencies = computed(() => {
    if (_availableCurrencies.value?.length) {
      return _availableCurrencies.value;
    }
    return currency.value ? [currency.value] : [];
  });

  const loadAvailableCurrencies = async (options?: {
    forceReload: boolean;
  }): Promise<void> => {
    if (!options?.forceReload && _availableCurrencies.value?.length) return;
    const response = await getAvailableCurrencies(apiInstance);
    _availableCurrencies.value = response?.elements;
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
}
