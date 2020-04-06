import Vue from "vue";
import { reactive, computed, onMounted } from "@vue/composition-api";
import { getAvailableCurrencies, setCurrentCurrency, getCurrentCurrency } from "@shopware-pwa/shopware-6-client";

const sharedCurrency = Vue.observable({
  currentCurrency: null,
  availableCurrencies: null
} as any);

/**
 * @alpha
 */
export const useCurrencySwitcher = (): any => {
  
  const localCurrency = reactive(sharedCurrency);
  const currentCurrency = computed(() => localCurrency.currentCurrency);
  const availableCurrencies = computed(() => localCurrency.availableCurrencies);

  const fetchCurrencies = async (): Promise<void> => {
    if (!sharedCurrency.currencies) {
      const currencies = await getAvailableCurrencies();
      sharedCurrency.currencies = currencies;
    }
  };

  const fetchCurrentCurrency = async (): Promise<void> => {
    if (!sharedCurrency.currentCurrency) {
      sharedCurrency.currentCurrency = await getCurrentCurrency();
    }
  }

  const switchCurrency = async (currencyId: string): Promise<boolean> => {
    if (!currencyId) {
      return false;
    }
    try {
      await setCurrentCurrency(currencyId);
    } catch (e) {
      return false;
    }

    return true;
  }

  onMounted(() => {
    fetchCurrencies();
    fetchCurrentCurrency();
  })

  return {
    availableCurrencies,
    currentCurrency,
    switchCurrency
  };
};
