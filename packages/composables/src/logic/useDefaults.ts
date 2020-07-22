import { ref } from "@vue/composition-api";
import { getIncludesForEntity } from "../internalHelpers/includesParameter";
import { getAssociationsForEntity } from "../internalHelpers/associationsParameter";
import { EntityType } from "@shopware-pwa/commons/interfaces/internal/EntityType";

interface IUseDefaults {
  getIncludesConfig: () => any;
  getAssociationsConfig: () => any;
}

/**
 * Returns default config that can be appended by the new values
 * @beta
 */
export const useDefaults = (entityType: EntityType): IUseDefaults => {
  const type = ref(entityType);

  const getIncludesConfig = () => {
    if (!type.value) {
      return;
    }

    return getIncludesForEntity(type.value);
  };

  const getAssociationsConfig = () => {
    if (!type.value) {
      return;
    }

    return getAssociationsForEntity(type.value);
  };

  return {
    getIncludesConfig,
    getAssociationsConfig,
  };
};
