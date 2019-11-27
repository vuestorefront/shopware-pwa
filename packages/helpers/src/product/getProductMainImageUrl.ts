import { Product } from "@shopware-pwa/shopware-6-client";

/**
 * gets the cover image
 */
export default function getProductMainImageUrl(product: Product): string | null {
  return (product && product.cover && product.cover.media) ? product.cover.media.url : null
}