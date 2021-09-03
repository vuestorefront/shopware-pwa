import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get product number propety
 *
 * @public
 */
export function getProductNumber(product: Product): string | null {
  return product?.productNumber;
}
