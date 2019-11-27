import { Product } from "@shopware-pwa/shopware-6-client";
interface Parameters {
  product: Product
}
/**
 * gets the cover image
 */
export default function getProductMainImageUrl(params: Parameters): string | null {
  const { product } = params
  return (product && product.cover && product.cover.media) ? product.cover.media.url : null
}