import { computed, ComputedRef } from "vue-demi";
import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";

/**
 * @beta
 */
export interface UseCountry {
  currentCountry: ComputedRef<Country | null>;
  displayState: ComputedRef<boolean>;
  forceState: ComputedRef<boolean>;
}

/**
 * @beta
 */
export function useCountry(
  countryId: ComputedRef<string>,
  countries: ComputedRef<Country[]>
): UseCountry {
  const currentCountry = computed(() => {
    if (!countryId.value) return null;
    return (
      countries.value.find((country) => country.id === countryId.value) ?? null
    );
  });

  const displayState = computed(() => {
    // TODO: Currently only forceStateInRegistration can be configured in administration
    //  when displayStateInRegistration also is configurable, switch to displayStateInRegistration
    // https://github.com/vuestorefront/shopware-pwa/issues/1294
    return currentCountry.value?.forceStateInRegistration ?? false;
  });

  const forceState = computed(() => {
    return currentCountry.value?.forceStateInRegistration ?? false;
  });

  return {
    currentCountry,
    displayState,
    forceState,
  };
}
