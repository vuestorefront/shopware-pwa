import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get product has free shipping option
 *
 * @returns (boolean, null)
 *
 * @alpha
 */
export function getProductFreeShipping(product: Product): boolean | null {
  return product?.shippingFree || null;
}
