import { Product } from "@shopware-pwa/commons";

/**
 * Get the calculated list price
 *
 * @returns (number|undefined)
 *
 * @beta
 */
export function getProductCalculatedPrice(
  product: Product
): number | undefined {
  return product?.calculatedPrice?.unitPrice;
}
