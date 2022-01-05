import { Product } from "@shopware-pwa/commons";

/**
 * Get the calculated list price
 *
 * @returns (number|undefined)
 *
 * @beta
 */
export function getProductCalculatedListingPrice(
  product: Product
): number | undefined {
  return (
    product?.calculatedPrice?.listPrice?.price ||
    product?.calculatedPrice?.unitPrice
  );
}
