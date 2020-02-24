import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { getVariantOptionsLabel } from "./getVariantOptionsLabel";

/**
 * @alpha
 */
export function getProductName({ product }: { product?: Product } = {}):
  | string
  | null {
  if (!product) {
    return null;
  }
  const variantLabel = getVariantOptionsLabel({ product: product });
  return `${product.translated.name}${
    variantLabel ? " - " + variantLabel : ""
  }`;
}
