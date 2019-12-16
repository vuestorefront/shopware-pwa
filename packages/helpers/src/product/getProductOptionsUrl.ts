import { Product } from "@shopware-pwa/shopware-6-client";
import { getProductUrl } from "./getProductUrl";

export function getProductOptionsUrl({
  product,
  options
}: {
  product?: Product;
  options?: string[];
} = {}): string {
  if (!product) return "";
  const variant =
    options &&
    product.children &&
    product.children
      .filter(
        variant =>
          variant.optionIds &&
          variant.optionIds.every(optionId => options.includes(optionId))
      )
      .shift();
  const result = variant || product;
  return getProductUrl(result);
}
