import { Product } from "@shopware-pwa/shopware-6-client";

export function getProductUrl(product: Product): string {
  return product ? `/detail/${product.id}` : `/`;
}
