import { Ref, ref, computed } from "@vue/composition-api";
import {
  getAvailableSalutations,
} from "@shopware-pwa/shopware-6-client";
import { Salutation } from "@shopware-pwa/shopware-6-client/src/interfaces/models/system/salutation/Salutation";
import { ClientApiError } from "@shopware-pwa/shopware-6-client/src/interfaces/errors/ApiError";
import { mapSalutations } from "@shopware-pwa/helpers";

export interface UseSalutations {
  salutations: Ref<Salutation[] | null>;
  getMappedSalutations: Ref<Readonly<{ name: string | null; id: string }[]>>;
  fetchSalutations: () => Promise<void>;
  error: Ref<any>;
}

export const useSalutations = (): UseSalutations => {
  const salutations: Ref<Salutation[] | null> = ref(null);
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
  
  const getMappedSalutations = computed(() => {
    return mapSalutations(salutations.value);
  });

  return {
    salutations,
    fetchSalutations,
    getMappedSalutations,
    error
  };
};
