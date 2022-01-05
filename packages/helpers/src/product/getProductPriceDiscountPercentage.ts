import { Product } from "@shopware-pwa/commons";

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
