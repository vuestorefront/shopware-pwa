import { Product } from "@shopware-pwa/commons";

/**
 * Get product free shipping property
 *
 * @public
 */
export function getProductFreeShipping(product?: Product): boolean {
  return product?.shippingFree || false;
}
