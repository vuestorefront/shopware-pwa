import { Product } from "@shopware-pwa/shopware-6-client";

export default function isProductSimple(product: Product): boolean {
  return !!product.parentId
}