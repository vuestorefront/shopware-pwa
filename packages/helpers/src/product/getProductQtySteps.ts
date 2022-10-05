import { Product } from "@shopware-pwa/commons";

/**
 * Get product qty steps
 *
 * @public
 */
export function getProductQtySteps(
  product: Product,
  availableStockParam = 100,
  qtySteps = 50
): number[] | null {
  const availableStock = product?.availableStock || availableStockParam;

  if (!product.purchaseSteps || product?.purchaseSteps <= 1) return null;

  let i = product.purchaseSteps;
  let options: number[] = [];
  while (i <= availableStock || i < qtySteps) {
    options.push(i);
    i += product.purchaseSteps;
  }
  return options;
}
