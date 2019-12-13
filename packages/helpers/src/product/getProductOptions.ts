import { Product } from "@shopware-pwa/shopware-6-client";
import { UiProductOption } from "@shopware-pwa/helpers";

const findOptionForOtherAttributes = (
  selected: any,
  variant: any,
  attribute?: string
): boolean => {
  if (!attribute) {
    return true;
  }

  const selectedAttributesCount = Object.keys(selected).length;
  let nullableAttributesCount = 0;

  for (const attributeKey in selected) {
    if (!selected.hasOwnProperty(attributeKey)) {
      continue;
    }

    if (selected[attributeKey] === null) {
      nullableAttributesCount++;
    }

    if (attributeKey == attribute) {
      continue;
    }

    if (variant.id === selected[attributeKey]) {
      return true;
    }
  }

  return selectedAttributesCount == nullableAttributesCount || false;
};
export function getProductOptions({
  product,
  attribute,
  selected
}: {
  product?: Product;
  attribute?: string;
  selected?: any;
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
            id: variant.id,
            code: option.group && option.group.name,
            active: findOptionForOtherAttributes(selected, variant, attribute)
          });
        }
      }
    }
  });
  return Array.from(typeOptions.values());
}
