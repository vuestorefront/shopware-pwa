import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get product has free shipping option
 *
 * @returns (boolean)
 *
 * @alpha
 */
export function getProductFreeShipping(product?: Product): boolean {
  return product?.shippingFree || false;
}
