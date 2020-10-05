import defaultApiParams from "./internalHelpers/defaultApiParams.json";
import { Includes } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { ShopwareAssociation } from "@shopware-pwa/commons/interfaces/search/Association";

/**
 * Returns default system API params
 *
 * @beta
 */
export function getDefaultApiParams(): {
  [composableName: string]: {
    includes?: Includes;
    associations?: ShopwareAssociation;
  };
} {
  return defaultApiParams;
}
