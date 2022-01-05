import defaultApiParams from "./internalHelpers/defaultApiParams.json";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces";

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
