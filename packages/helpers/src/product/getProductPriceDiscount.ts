import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get value of price discount
 *
 * @returns (number|undefined)
 *
 * @beta
 */
export function getProductPriceDiscount(product: Product): number | undefined {
  return product?.calculatedPrice?.listPrice?.discount;
}
