import { Ref, ref, computed } from "@vue/composition-api";
import {
  getAvailableSalutations,
  getAvailableCountries
} from "@shopware-pwa/shopware-6-client";
import { Salutation } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/salutation/Salutation";
import { Country } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/country/Country";
import { ClientApiError } from "@shopware-pwa/shopware-6-client/src/interfaces/errors/ApiError";

export interface UseContext {
  countries: Ref<Country[] | null>;
  salutations: Ref<Salutation[] | null>;
  getMappedCountries: Ref<Readonly<{ name: string | null; id: string }[]>>;
  getMappedSalutations: Ref<Readonly<{ name: string | null; id: string }[]>>;
  fetchSalutations: () => Promise<void>;
  fetchCountries: () => Promise<void>;
  error: Ref<any>;
}

export const useContext = (): UseContext => {
  const salutations: Ref<Salutation[] | null> = ref(null);
  const countries: Ref<Country[] | null> = ref(null);
  const error: Ref<any> = ref(null);

  const fetchSalutations = async (): Promise<void> => {
    try {
      const fetchSalutations = await getAvailableSalutations();
      salutations.value = fetchSalutations.data;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err;
      console.error("Problem with fetching available saluations", err.message);
    }
  };

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
    const countryList = countries.value ?? [];
    return countryList.map((country: Country) => ({
      name: country.name,
      id: country.id
    }));
  });

  const getMappedSalutations = computed(() => {
    const salutationList = salutations.value ?? [];
    return salutationList.map((salutation: Salutation) => ({
      name: salutation.displayName,
      id: salutation.id
    }));
  });

  return {
    countries,
    salutations,
    fetchSalutations,
    fetchCountries,
    getMappedSalutations,
    getMappedCountries,
    error
  };
};
