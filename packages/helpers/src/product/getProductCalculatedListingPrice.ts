import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

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
