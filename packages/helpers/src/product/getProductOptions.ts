import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";
import { UiProductOption } from "@shopware-pwa/helpers";

export function getProductOptions({
  product,
  attribute
}: {
  product?: Product;
  attribute?: string;
} = {}): UiProductOption[] {
  if (!product || !product.children) {
    return [];
  }

  const typeOptions = new Map();
  product.children.forEach(variant => {
    if (!variant || !variant.options || !variant.options.length) {
      return;
    }

    for (let option of variant.options) {
      if ((option.group && option.group.name === attribute) || !attribute) {
        if (!typeOptions.has(option.id)) {
          typeOptions.set(option.id, {
            label: option.name,
            code: option.id,
            value: option.name
          } as UiProductOption);
        }
      }
    }
  });
  return Array.from(typeOptions.values());
}
