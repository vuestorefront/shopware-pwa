import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get product rating average property
 *
 * @public
 */
export function getProductRatingAverage(product: Product): number | null {
  return product?.ratingAverage;
}
