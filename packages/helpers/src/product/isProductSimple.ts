import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";

export function isProductSimple({
  product
}: { product?: Product } = {}): boolean {
  return !!product && !!product.parentId && product.id !== product.parentId;
}
