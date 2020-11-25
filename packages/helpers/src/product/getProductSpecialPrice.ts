import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get the lowest price from the prices array.
 * Advanced pricing can be set in `Advanced pricing` tab in `Product view` (admin panel)
 *
 *
 * @deprecated consider using getCalculatedListingPrice or getProductCalculatedPrice
 * @returns (number|undefined)
 * @alpha
 */
export function getProductSpecialPrice(product: Product): number | undefined {
  return product?.calculatedPrices?.[0]?.unitPrice;
}
