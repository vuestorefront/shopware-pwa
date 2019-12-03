import { Product } from "@shopware-pwa/shopware-6-client";

export function isProductSimple({
  product
}: { product?: Product } = {}): boolean {
  return product
    ? !!product.parentId && product.id !== product.parentId
    : false;
}
