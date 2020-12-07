import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { getProductUrl } from "./getProductUrl";

/**
 * @alpha
 */
export function getProductOptionsUrl({
  product,
  options,
}: {
  product?: Product;
  options?: string[];
} = {}): string | undefined {
  if (!product) return "";
  const variant =
    options &&
    product.children &&
    product.children
      .filter(
        (variant) =>
          variant.optionIds &&
          variant.optionIds.every((optionId) => options.includes(optionId))
      )
      .shift();

  return variant && getProductUrl(variant);
}
