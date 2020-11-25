import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get the percentage value of discount
 *
 * @returns (number|undefined)
 *
 * @beta
 */
export function getProductPriceDiscountPercentage(
  product: Product
): number | undefined {
  return product?.calculatedPrice?.listPrice?.percentage;
}
