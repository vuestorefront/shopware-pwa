import { Product } from "@shopware-pwa/commons";
import { getTranslatedProperty } from "@shopware-pwa/helpers";

/**
 * @beta
 */
export function getProductName({ product }: { product?: Product } = {}):
  | string
  | null {
  if (!product) {
    return null;
  }
  return getTranslatedProperty(product, "name");
}
