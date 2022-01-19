import { Product } from "@shopware-pwa/commons";

/**
 * gets the cover image
 *
 * @public
 */
export function getProductMainImageUrl(product: Product): string {
  return product?.cover?.media?.url || product?.cover?.url || "";
}
