import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { UiProductOption } from "../ui-interfaces";

/**
 * @alpha
 */
export interface ProductOptions {
  [attribute: string]: UiProductOption[];
}

/**
 * @alpha
 */
export function getProductOptions({
  product,
}: {
  product?: Product;
} = {}): ProductOptions {
  let typeOptions = {} as any;
  product?.children?.forEach((variant) => {
    if (!variant?.options?.length) {
      return;
    }

    for (let option of variant.options) {
      if (option.group?.translated.name) {
        if (!typeOptions.hasOwnProperty(option.group.translated.name)) {
          typeOptions[option.group.translated.name] = [];
        }

        if (
          !typeOptions[option.group.translated.name].find(
            (valueOption: any) => option.id == valueOption.code
          )
        ) {
          typeOptions[option.group.translated.name].push({
            label: option.translated.name,
            code: option.id,
            value: option.translated.name,
            color: option.colorHexCode,
          } as UiProductOption);
        }
      }
    }
  });

  return typeOptions;
}
