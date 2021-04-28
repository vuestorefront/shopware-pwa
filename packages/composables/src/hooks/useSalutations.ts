import Vue from "vue";
import { Ref, ref, computed, reactive, onMounted } from "@vue/composition-api";
import { getAvailableSalutations } from "@shopware-pwa/shopware-6-client";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { getApplicationContext } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";

/**
 * @beta
 */
export interface UseSalutations {
  mountedCallback: () => Promise<void>;
  getSalutations: Ref<Readonly<any>>;
  fetchSalutations: () => Promise<void>;
  error: Ref<any>;
}

const sharedSalutations = Vue.observable({
  salutations: null,
} as any);

/**
 * @beta
 */
export const useSalutations = (
  rootContext: ApplicationVueContext
): UseSalutations => {
  const { apiInstance } = getApplicationContext(rootContext, "useSalutations");

  const localSalutations = reactive(sharedSalutations);
  const error: Ref<any> = ref(null);

  const fetchSalutations = async (): Promise<void> => {
    try {
      const { elements } = await getAvailableSalutations(apiInstance);
      sharedSalutations.salutations = elements;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    }
  };

  // created separate function for testing proposes
  const mountedCallback = async () => {
    if (!sharedSalutations.salutations) {
      await fetchSalutations();
    }
  };

  const getSalutations = computed(() => {
    return localSalutations.salutations ?? [];
  });

  onMounted(mountedCallback);

  return {
    mountedCallback,
    fetchSalutations,
    getSalutations,
    error,
  };
};
