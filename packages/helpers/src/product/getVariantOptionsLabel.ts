import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * @alpha
 */
export function getVariantOptionsLabel({
  product
}: { product?: Product } = {}): string | null {
  if (
    !product ||
    !product.options ||
    (product.options && !product.options.length)
  ) {
    return null;
  }
  let variantLabel = "";
  for (let { name } of product.options) {
    variantLabel += `${name} `;
  }

  return variantLabel.trim();
}
