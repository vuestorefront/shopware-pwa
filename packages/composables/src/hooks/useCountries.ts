import Vue from "vue";
import { computed, Ref, ref, reactive, onMounted } from "@vue/composition-api";
import { getAvailableCountries } from "@shopware-pwa/shopware-6-client";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { getApplicationContext } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";

/**
 * @alpha
 */
export interface UseCountries {
  mountedCallback: () => Promise<void>;
  getCountries: Ref<Readonly<any>>;
  fetchCountries: () => Promise<void>;
  error: Ref<any>;
}

const sharedCountries = Vue.observable({
  countries: null,
} as any);

/**
 * @alpha
 */
export const useCountries = (
  rootContext: ApplicationVueContext
): UseCountries => {
  getApplicationContext(rootContext, "useCountries");
  const localCountries = reactive(sharedCountries);
  const error: Ref<any> = ref(null);

  const fetchCountries = async (): Promise<void> => {
    try {
      const fetchCountries = await getAvailableCountries();
      sharedCountries.countries = fetchCountries.data;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    }
  };

  const getCountries = computed(() => {
    return localCountries.countries ?? [];
  });

  const mountedCallback = async () => {
    if (!sharedCountries.countries) {
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
};
