import defaultApiParams from "./internalHelpers/defaultApiParams.json";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * Returns default system API params
 *
 * @beta
 */
export function getDefaultApiParams(): {
  [composableName: string]: ShopwareSearchParams;
} {
  return defaultApiParams;
}
