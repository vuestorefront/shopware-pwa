import { ref } from "@vue/composition-api";
import { getIncludesForEntity } from "../internalHelpers/includesParameter";
import { getAssociationsForEntity } from "../internalHelpers/associationsParameter";
import { EntityType } from "@shopware-pwa/commons/interfaces/internal/EntityType";

interface IUseDefaults {
  getIncludesConfig: (newConfig?: any) => any;
  getAssociationsConfig: (newConfig?: any) => any;
}

/**
 * Returns default config that can be appended by the new values
 * @beta
 * @param entityType
 */
export const useDefaults = (entityType: EntityType): IUseDefaults => {
  const type = ref(entityType);

  const getIncludesConfig = (newConfig?: any) => {
    if (!type.value) {
      return;
    }

    const includes = getIncludesForEntity(type.value);
    return Object.assign({}, includes, newConfig);
  };

  const getAssociationsConfig = (newConfig?: any) => {
    if (!type.value) {
      return;
    }

    const associations = getAssociationsForEntity(type.value);
    return Object.assign({}, associations, newConfig);
  };

  return {
    getIncludesConfig,
    getAssociationsConfig,
  };
};
