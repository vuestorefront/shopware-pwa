import { Product } from "@shopware-pwa/shopware-6-client";

export function isProductSimple({
  product
}: { product?: Product } = {}): boolean {
  console.warn(
    "isProductsimple",
    product && product.parentId,
    product && product.id
  );
  return !!product && !!product.parentId && product.id !== product.parentId;
}
