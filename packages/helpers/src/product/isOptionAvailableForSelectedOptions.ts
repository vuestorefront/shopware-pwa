import { UiProductOption } from "../ui-interfaces";
import { ProductOptions } from "./getProductOptions";

/**
 * Check if the current optionId is also present in matching option ids of other available variants.
 *
 * @beta
 */
export function isOptionAvailableForSelectedOptions(
  currentAttribute: string,
  selectedOptionId: string,
  { code: optionId }: UiProductOption = {} as any,
  allOptions: ProductOptions,
  allSelectedOptions: {
    [key: string]: string;
  }
): boolean {
  if (
    !currentAttribute ||
    !selectedOptionId ||
    !optionId ||
    !allOptions ||
    !allSelectedOptions
  ) {
    return false;
  }

  if (optionId == selectedOptionId) {
    return true;
  }

  let matchingOptions = false;
  Object.entries(allSelectedOptions).forEach(([attribute, selectedId]) => {
    if (attribute !== currentAttribute) {
      allOptions[attribute].forEach((otherOption) => {
        // istanbul ignore next
        if (otherOption.code === selectedId) {
          matchingOptions = otherOption["matchingIds"].includes(optionId);
        }
      });
    }
  });

  return matchingOptions;
}
