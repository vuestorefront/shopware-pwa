import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get product rating average
 *
 * @returns (boolean, null)
 *
 * @alpha
 */
export function getRatingAverage(product: Product): number | null {
  return product?.ratingAverage || null;
}
