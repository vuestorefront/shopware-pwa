import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";

/**
 * gets the cover image
 *
 * @alpha
 */

/**
 * @alpha
 */
export function getProductMainImageUrl({
  product
}: { product?: Product } = {}): string | undefined {
  return (
    product &&
    product.cover &&
    ((product.cover.media && product.cover.media.url) || product.cover.url)
  );
}
