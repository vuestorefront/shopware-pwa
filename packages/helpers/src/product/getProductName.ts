import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";
import { getVariantOptionsLabel } from "./getVariantOptionsLabel";

export function getProductName({ product }: { product?: Product } = {}):
  | string
  | null {
  if (!product) {
    return null;
  }
  const variantLabel = getVariantOptionsLabel({ product: product });
  return `${product.name || product.translated.name}${
    variantLabel ? " - " + variantLabel : ""
  }`;
}
