import { Product } from "@shopware-pwa/commons";
import { getProductRealPrice } from "./getProductRealPrice";

/**
 * @beta
 */
export function getProductVariantsFromPrice(
  product: Product
): number | undefined {
  if (!product) {
    return;
  }

  const realPrice = getProductRealPrice(product);
  const cheapestPrice = product.calculatedCheapestPrice;

  if (cheapestPrice?.unitPrice != realPrice?.unitPrice) {
    return cheapestPrice?.unitPrice;
  }
}
