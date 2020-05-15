import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

interface TierPrice {
  description: string;
  unitPrice: number;
}

/**
 * @alpha
 */
export function getProductTierPrices(
  product: Product
): TierPrice[] | undefined {
  if (!product || !product.calculatedPrices?.length) {
    return [];
  }
  const size = product.calculatedPrices.length;

  return product.calculatedPrices.map(({ unitPrice, quantity }, index) => ({
    description: index === size - 1 ? `from ${quantity}` : `to ${quantity}`,
    unitPrice,
  }));
}
