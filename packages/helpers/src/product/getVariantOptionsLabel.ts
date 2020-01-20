import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";

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
