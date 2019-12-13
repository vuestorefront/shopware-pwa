import { Product } from "@shopware-pwa/shopware-6-client";

export function getPrettyUrl(
  product?: Product | null
): string | false | null | undefined {
  return (
    product &&
    product.seoUrls &&
    product.seoUrls.length > 0 &&
    product.seoUrls[0].seoPathInfo
  );
}

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
      console.warn("LINK: ", getPrettyUrl(variant));
      return variant;
    }
  }

  return null;
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

  return getPrettyUrl(foundVariant);
}
