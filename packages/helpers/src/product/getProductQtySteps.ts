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
  if (!product.purchaseSteps || product.purchaseSteps <= 1) return null;
  const availableStock = product.availableStock || availableStockParam;
  const stepsFromStock = Math.floor(availableStock / product.purchaseSteps);
  const steps = qtySteps < stepsFromStock ? qtySteps : stepsFromStock;
  let options: number[] = [];
  let i = 1;

  while (i <= steps) {
    options.push(product.purchaseSteps * i++);
  }

  return options;
}
