import { Ref, ref, computed } from "@vue/composition-api";
import { getAvailableCountries } from "@shopware-pwa/shopware-6-client";
import { Country } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/country/Country";
import { ClientApiError } from "@shopware-pwa/shopware-6-client/src/interfaces/errors/ApiError";
import { mapCountries } from "@shopware-pwa/helpers";

export interface UseCountries {
  countries: Ref<Country[] | null>;
  getMappedCountries: Ref<Readonly<{ name: string | null; id: string }[]>>;
  fetchCountries: () => Promise<void>;
  error: Ref<any>;
}

export const useCountries = (): UseCountries => {
  const countries: Ref<Country[] | null> = ref(null);
  const error: Ref<any> = ref(null);

  const fetchCountries = async (): Promise<void> => {
    try {
      const fetchCountries = await getAvailableCountries();
      countries.value = fetchCountries.data;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err;
      console.error("Problem with fetching available countries", err.message);
    }
  };

  const getMappedCountries = computed(() => {
    return mapCountries(countries.value);
  });

  return {
    countries,
    fetchCountries,
    getMappedCountries,
    error
  };
};
