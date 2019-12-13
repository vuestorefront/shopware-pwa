import { Product } from "@shopware-pwa/shopware-6-client";
import { getProductUrl } from "./getProductUrl";

export function getProductOptionVariant({
  selectedOptionId,
  variants
}: {
  variants?: Product[];
  selectedOptionId?: string;
} = {}): Product | null {
  if (!variants) {
    return null;
  }

  for (const variant of variants) {
    if (!variant.options) {
      continue;
    }
    if (variant.id == selectedOptionId) {
      console.warn("LINK: ", getProductUrl(variant));
      return variant;
    }
  }

  return null;
}
export function getProductOptionsUrl({
  options,
  product
}: {
  options?: string[];
  product?: Product;
} = {}): string {
  if (!product) return "";
  const variant =
    options &&
    product.children
      .filter(
        variant =>
          variant.optionIds &&
          variant.optionIds.every(optionId => options.includes(optionId))
      )
      .shift();
  console.error('VARIANT FOUND', variant)
  // const foundVariant = getProductOptionVariant({
  //   selectedOptionId,
  //   variants
  // });
  const result = variant || product;

  console.warn("found variant:", variant);

  return getProductUrl(result);
}

export function getProductOptionUrl({
  selectedOptionId,
  variants
}: {
  variants?: Product[];
  selectedOptionId?: string;
} = {}): string | false | null | undefined {
  const foundVariant = getProductOptionVariant({
    selectedOptionId,
    variants
  });

  console.warn("found variant:", foundVariant);

  return getProductUrl(foundVariant);
}
