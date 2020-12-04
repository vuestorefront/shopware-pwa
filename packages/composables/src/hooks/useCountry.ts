import { computed, ComputedRef, Ref } from "@vue/composition-api";
import { ApplicationVueContext, useCountries } from "@shopware-pwa/composables";
import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";

/**
 * @beta
 */
export interface UseCountry {
  currentCountry: ComputedRef<Country | null>;
  displayState: Readonly<Ref<boolean>>;
  forceState: Readonly<Ref<boolean>>;
}

export const useCountry = (
  countryId: string,
  rootContext: ApplicationVueContext
): UseCountry => {
  const { getCountries } = useCountries(rootContext);

  const currentCountry = computed(() => {
    if (!countryId) return null;
    return (
      getCountries.value.find((country) => country.id === countryId.value) ??
      null
    );
  });

  const displayState = computed(() => {
    // TODO: Currently only forceStateInRegistration can be configured in administration
    //  when displayStateInRegistration also is configurable, switch to displayStateInRegistration
    return currentCountry?.value?.forceStateInRegistration ?? false;
  });

  const forceState = computed(() => {
    return currentCountry?.value?.forceStateInRegistration ?? false;
  });

  return {
    currentCountry,
    displayState,
    forceState,
  };
};
