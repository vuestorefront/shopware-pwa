import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * @alpha
 */
export function getProductSpecialPrice(product: Product): number | undefined {
  const price = product?.calculatedPrices?.[0]?.unitPrice;
  return price || undefined;
}
