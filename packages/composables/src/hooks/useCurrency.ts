import Vue from "vue";
import { reactive, computed, onMounted, Ref } from "@vue/composition-api";
import {
  getAvailableCurrencies,
  setCurrentCurrency,
  getSessionContext,
} from "@shopware-pwa/shopware-6-client";
const sharedCurrency = Vue.observable({
  currentCurrency: null,
  availableCurrencies: [],
} as any);

/**
 * @alpha
 */
export interface UseCurrency {
  onMountedCallback: () => Promise<void>;
  switchCurrency: (currencyId: string) => Promise<boolean>;
  availableCurrencies: Ref<Readonly<any>>;
  currentCurrency: Ref<Readonly<any>>;
  currentCurrencySymbol: Ref<Readonly<any>>;
}

/**
 * @alpha
 */
export const useCurrency = (): UseCurrency => {
  const localCurrency = reactive(sharedCurrency);
  const currentCurrency = computed(() => localCurrency.currentCurrency);
  const currentCurrencySymbol = computed(
    () =>
      (localCurrency.currentCurrency && localCurrency.currentCurrency.symbol) ||
      ""
  );
  const availableCurrencies = computed(
    () => localCurrency.availableCurrencies || []
  );

  const fetchCurrencies = async (): Promise<void> => {
    if (
      Array.isArray(sharedCurrency.availableCurrencies) &&
      sharedCurrency.availableCurrencies.length
    ) {
      return;
    }
    const currencies = await getAvailableCurrencies();
    sharedCurrency.availableCurrencies = currencies;
  };

  const fetchCurrentCurrency = async (
    force: boolean = false
  ): Promise<void> => {
    if (sharedCurrency.currentCurrency && !force) {
      return;
    }

    const { currency } = await getSessionContext();
    sharedCurrency.currentCurrency = currency;
  };

  /**
   * @alpha
   */
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
  };

  /**
   * @alpha
   */
  const onMountedCallback = async () => {
    await fetchCurrencies();
    await fetchCurrentCurrency();
  };

  onMounted(onMountedCallback);

  return {
    onMountedCallback,
    switchCurrency,
    availableCurrencies,
    currentCurrency,
    currentCurrencySymbol,
  };
};
