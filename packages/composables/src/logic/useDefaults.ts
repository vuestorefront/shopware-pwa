import { ref, computed, Ref } from "@vue/composition-api";
import { getIncludesForEntity } from "../internalHelpers/includesParameter";
import { getAssociationsForEntity } from "../internalHelpers/associationsParameter";

interface IUseDefaults {
  getIncludesConfig: Readonly<Ref<any>>;
  getAssociationsConfig: Readonly<Ref<any>>;
}

/**
 * Returns default config depending on config key
 */
export const useDefaults = (key: string): IUseDefaults => {
  if (!key) {
    throw new Error("useDefaults: key has not been provided.");
  }
  const type = ref(key);

  return {
    getIncludesConfig: computed(() => getIncludesForEntity(type.value)),
    getAssociationsConfig: computed(() => getAssociationsForEntity(type.value)),
  };
};
