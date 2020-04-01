import Vue from "vue";
import { Ref, ref, computed, reactive, onMounted } from "@vue/composition-api";
import { getAvailableSalutations } from "@shopware-pwa/shopware-6-client";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

/**
 * @alpha
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
 * @alpha
 */
export const useSalutations = (): UseSalutations => {
  const localSalutations = reactive(sharedSalutations);
  const error: Ref<any> = ref(null);

  const fetchSalutations = async (): Promise<void> => {
    try {
      const fetchSalutations = await getAvailableSalutations();
      sharedSalutations.salutations = fetchSalutations.data;
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
