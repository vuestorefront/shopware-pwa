import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get the lowest price from the prices array.
 * Advanced pricing can be set in `Advanced pricing` tab in `Product view` (admin panel)
 *
 * @returns (number|undefined)
 * @alpha
 */
export function getProductSpecialPrice(product: Product): number | undefined {
  return product?.calculatedPrices?.[0]?.unitPrice;
}
