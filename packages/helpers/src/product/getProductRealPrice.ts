import { CalculatedPrice, Product } from "@shopware-pwa/commons";

/**
 * @beta
 */
export function getProductRealPrice(
  product: Product
): CalculatedPrice | undefined {
  if (!product) {
    return;
  }

  const real = product.calculatedPrice;
  if (product.calculatedPrices?.length > 1) {
    return product.calculatedPrices[product.calculatedPrices.length - 1];
  }
  return real;
}
