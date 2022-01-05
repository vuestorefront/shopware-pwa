import { Product } from "@shopware-pwa/commons";

/**
 * @beta
 */
export interface TierPrice {
  label: string; // information about the quantity range
  quantity: number; // price limit value
  unitPrice: number; // price for only one product in given price range (quantity)
}

/**
 * Get the prices depending on quantity added to cart.
 * Tier prices can be set in `Advanced pricing` tab in `Product view` (admin panel)
 *
 * @returns TierPrice[]
 * @beta
 */
export function getProductTierPrices(product: Product): TierPrice[] {
  if (!product || !product.calculatedPrices?.length) {
    return [];
  }
  const size = product.calculatedPrices.length;

  return product.calculatedPrices.map(({ unitPrice, quantity }, index) => ({
    label: index === size - 1 ? `from ${quantity}` : `to ${quantity}`,
    quantity,
    unitPrice,
  }));
}
