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
      const groupName = option.group?.translated?.name || option.group?.name;
      if (groupName) {
        if (!typeOptions.hasOwnProperty(groupName)) {
          typeOptions[groupName] = [];
        }

        if (
          !typeOptions[groupName].find(
            (valueOption: any) => option.id == valueOption.code
          )
        ) {
          let matchingOptionIds: string[] = [];
          option.productOptions?.forEach((productOption) => {
            productOption.optionIds?.length &&
              matchingOptionIds.push(...productOption.optionIds);
          });

          typeOptions[groupName].push({
            label: option.translated?.name || option.name,
            code: option.id,
            value: option.translated?.name || option.name,
            color: option.colorHexCode,
            matchingIds: matchingOptionIds,
          } as UiProductOption);
        }
      }
    }
  });

  return typeOptions;
}
