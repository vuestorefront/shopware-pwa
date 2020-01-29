import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";

/**
 * @alpha
 */
export function getProductRegularPrice({
  product
}: { product?: Product } = {}): number {
  return product?.price?.[0]?.gross || 0;
}
