import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * @alpha
 */
export function getProductSpecialPrice(product: Product): number | undefined {
  return product?.calculatedPrices?.[0]?.unitPrice;
}
