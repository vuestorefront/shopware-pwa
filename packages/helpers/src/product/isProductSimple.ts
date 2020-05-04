import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * @beta
 */
export function isProductSimple({
  product,
}: { product?: Product } = {}): boolean {
  return !!product?.parentId && product.id !== product.parentId;
}
