import Vue from "vue";
import { reactive, computed, onMounted, Ref } from "@vue/composition-api";
import { getAvailableCurrencies } from "@shopware-pwa/shopware-6-client";
import { useSessionContext } from "@shopware-pwa/composables";
import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";

const sharedCurrency = Vue.observable({
  availableCurrencies: [],
} as any);

/**
 * @alpha
 */
export interface UseCurrency {
  onMountedCallback: () => Promise<void>;
  setCurrency: (parameter: Partial<Currency>) => Promise<boolean>;
  availableCurrencies: Ref<Readonly<any>>;
  currency: Readonly<Ref<Currency | null>>;
  currencySymbol: Ref<Readonly<string>>;
}

/**
 * @alpha
 */
export const useCurrency = (): UseCurrency => {
  const {
    currency,
    setCurrency: setContextCurrency,
    refreshSessionContext,
  } = useSessionContext();
  const localCurrency = reactive(sharedCurrency);
  const currencySymbol = computed(
    () => (currency.value && currency.value.symbol) || ""
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

  /**
   * @alpha
   */
  const setCurrency = async ({ id }: Partial<Currency>): Promise<boolean> => {
    if (!id) {
      return false;
    }
    try {
      await setContextCurrency({ id });
    } catch (e) {
      return false;
    }

    await refreshSessionContext();

    return true;
  };

  /**
   * @alpha
   */
  const onMountedCallback = async () => {
    await refreshSessionContext();
    await fetchCurrencies();
  };

  onMounted(onMountedCallback);

  return {
    onMountedCallback,
    setCurrency,
    availableCurrencies,
    currencySymbol,
    currency,
  };
};
