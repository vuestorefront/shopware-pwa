import { Product } from "@shopware-pwa/commons";

/**
 * Get product number propety
 *
 * @public
 */
export function getProductNumber(product: Product): string | null {
  return product?.productNumber;
}
