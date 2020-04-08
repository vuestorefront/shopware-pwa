import Vue from "vue";
import { reactive, computed, onMounted } from "@vue/composition-api";
import { getAvailableCurrencies, setCurrentCurrency, getCurrentCurrency } from "@shopware-pwa/shopware-6-client";

const sharedCurrency = Vue.observable({
  currentCurrency: '', // should be empty as default to prevent null displaying, next to price
  availableCurrencies: null
} as any);

/**
 * @alpha
 */
export const useCurrency = (): any => {
  
  const localCurrency = reactive(sharedCurrency);
  const currentCurrency = computed(() => localCurrency.currentCurrency);
  const currentCurrencySymbol = computed(() => localCurrency.currentCurrency && localCurrency.currentCurrency.symbol);
  const availableCurrencies = computed(() => localCurrency.availableCurrencies);

  const fetchCurrencies = async (): Promise<void> => {
    if (!sharedCurrency.currencies) {
      const currencies = await getAvailableCurrencies();
      sharedCurrency.availableCurrencies = currencies;
    }
  };

  const fetchCurrentCurrency = async (force:boolean = false): Promise<void> => {
    if (!sharedCurrency.currentCurrency || sharedCurrency.currentCurrency === "" || force) {
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

    await fetchCurrentCurrency(true);

    return true;
  }

  onMounted(() => {
     fetchCurrencies();
     fetchCurrentCurrency();
  })

  return {
    fetchCurrencies,
    switchCurrency,
    availableCurrencies,
    currentCurrency,
    currentCurrencySymbol,
  };
};
