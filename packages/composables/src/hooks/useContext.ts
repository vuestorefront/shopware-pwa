import { Ref, ref } from "@vue/composition-api";
import {
  getAvailableSalutations,
  getAvailableCountries
} from "@shopware-pwa/shopware-6-client";
import { Salutation } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/salutation/Salutation";
import { Country } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/country/Country";

export interface UseContext {
  countries: Ref<Country[] | null>;
  salutations: Ref<Salutation[] | null>;
  mappedCountries: Ref<{ name: string; id: string }[] | null>;
  mappedSalutations: Ref<{ displayName: string; id: string }[] | null>;
  fetchSalutations: () => Promise<void>;
  fetchCountries: () => Promise<void>;
}

export const useContext = (): UseContext => {
  const salutations: Ref<Salutation[] | null> = ref(null);
  const countries: Ref<Country[] | null> = ref(null);
  const mappedCountries: Ref<{ name: string; id: string }[] | null> = ref(null);
  const mappedSalutations: Ref<
    { displayName: string; id: string }[] | null
  > = ref(null);

  const fetchSalutations = async (): Promise<void> => {
    try {
      const fetchSalutations = await getAvailableSalutations();
      salutations.value = fetchSalutations;
      mapSalutations();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCountries = async (): Promise<void> => {
    try {
      const fetchCountries = await getAvailableCountries();
      countries.value = fetchCountries.data;
      mapCountries();
    } catch (e) {
      console.error(e);
    }
  };

  const mapCountries = (): void => {
    const countryList = countries.value ?? [];
    mappedCountries.value = countryList.map((country: Country) => ({
      name: country.name,
      id: country.id
    })) as any;
  };

  const mapSalutations = (): void => {
    const salutationList = salutations.value ?? [];
    mappedSalutations.value = salutationList.map((salutation: Salutation) => ({
      displayName: salutation.displayName,
      salutation: salutation.id
    })) as any;
  };

  return {
    countries,
    salutations,
    fetchSalutations,
    fetchCountries,
    mappedCountries,
    mappedSalutations
  };
};
