import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get the price for 1 unit of a product
 *
 * @returns (number|undefined)
 *
 * @beta
 */
export function getProductCalculatedUnitPrice(
  product: Product
): number | undefined {
  return product?.calculatedPrice?.unitPrice;
}
