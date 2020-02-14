import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";

/**
 * gets the cover image
 *
 * @alpha
 */
export function getProductMainImageUrl(product: Product): string {
  return product?.cover?.media?.url || product?.cover?.url || "";
}
