import { computed, Ref, ref, onMounted, ComputedRef } from "vue-demi";
import { getAvailableCountries } from "@shopware-pwa/shopware-6-client";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import {
  useSharedState,
  ApplicationVueContext,
  getApplicationContext,
} from "@shopware-pwa/composables";
import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";

/**
 * @beta
 */
export interface UseCountries {
  mountedCallback: () => Promise<void>;
  getCountries: ComputedRef<Country[]>;
  fetchCountries: () => Promise<void>;
  error: Ref<any>;
}

/**
 * @beta
 */
export function useCountries(rootContext: ApplicationVueContext): UseCountries {
  const COMPOSABLE_NAME = "useCountries";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });
  const { sharedRef } = useSharedState(rootContext);
  const _sharedCountried: Ref<Country[] | null> = sharedRef(
    `sw-${contextName}-countries`
  );
  const error: Ref<any> = ref(null);

  const fetchCountries = async (): Promise<void> => {
    try {
      const { elements } = await getAvailableCountries(apiInstance);
      _sharedCountried.value = elements;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.messages;
    }
  };

  const getCountries = computed(() => {
    return _sharedCountried.value ?? [];
  });

  const mountedCallback = async () => {
    if (!_sharedCountried.value) {
      await fetchCountries();
    }
  };

  onMounted(mountedCallback);

  return {
    mountedCallback,
    fetchCountries,
    getCountries,
    error,
  };
}
