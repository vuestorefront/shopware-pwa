import { Product } from "@shopware-pwa/shopware-6-client";

/**
 * gets the cover image
 */
export function getProductMainImageUrl({
  product
}: { product?: Product } = {}): string | undefined {
  return ( product && product.cover && ((product.cover.media && product.cover.media.url) || product.cover.url));
}
