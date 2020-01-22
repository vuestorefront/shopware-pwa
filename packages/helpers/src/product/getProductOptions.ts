import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";
import { UiProductOption } from "@shopware-pwa/helpers";

interface ProductOptions {
  [attribute: string]: UiProductOption[];
}

export function getProductOptions({
  product
}: {
  product?: Product;
} = {}): ProductOptions | [] {
  if (!product || !product.children) {
    return [];
  }

  let typeOptions = {} as any;
  product.children.forEach(variant => {
    if (!variant || !variant.options || !variant.options.length) {
      return;
    }

    for (let option of variant.options) {
      if (option.group && option.group.name) {
        if (!typeOptions.hasOwnProperty(option.group.name)) {
          typeOptions[option.group.name] = [];
        }

        if (
          !typeOptions[option.group.name].find(
            (valueOption: any) => option.id == valueOption.code
          )
        ) {
          typeOptions[option.group.name].push({
            label: option.name,
            code: option.id,
            value: option.name
          } as UiProductOption);
        }
      }
    }
  });

  return typeOptions;
}
