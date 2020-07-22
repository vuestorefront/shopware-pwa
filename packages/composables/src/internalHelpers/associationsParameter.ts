/**
 * A collection of performance set of association parameters
 */
import apiParams from "@shopware-pwa/composables/src/api-params.json";

/**
 * Gets the right associations parameter for given entity type
 * @param entity
 */
export const getAssociationsForEntity = (entity: string): any => {
  if (!entity) {
    throw new Error(
      "getAssociationsForEntity: there is no entityType provided."
    );
  }
  const params: any = apiParams;

  if (!(entity in params)) {
    throw new Error(
      "getAssociationsForEntity: there are no associations for given entity type."
    );
  }

  return params[entity]["associations"];
};
