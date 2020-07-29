/**
 * A collection of performance set of includes parameters
 */
import apiParams from "@shopware-pwa/composables/src/api-params.json";

/**
 * Gets the right includes parameter for given entity type
 * @param entity
 */
export const getIncludesForEntity = (entity: string): any => {
  if (!entity) {
    throw new Error("getIncludesForEntity: there is no entityType provided.");
  }
  const params: any = apiParams;

  if (!(entity in params)) {
    throw new Error(
      "getIncludesForEntity: there are no includes for given entity type."
    );
  }

  return params[entity]["includes"];
};
