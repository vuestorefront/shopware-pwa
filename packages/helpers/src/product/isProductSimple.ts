import { Product } from "@shopware-pwa/commons";

/**
 * @beta
 */
export function isProductSimple({
  product,
}: { product?: Product } = {}): boolean {
  return !!product?.parentId && product.id !== product.parentId;
}
