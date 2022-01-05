import { Product } from "@shopware-pwa/commons";
import { getTranslatedProperty } from "@shopware-pwa/helpers";
import { UiProductOption } from "../ui-interfaces";

/**
 * Get product options as ui-interfaces
 *
 * @public
 */
export function getProductOptions({
  product,
}: {
  product?: Product;
} = {}): UiProductOption[] {
  return (
    product?.options?.map((option) => ({
      label: getTranslatedProperty(option, "name"),
      code: option.id,
      value: getTranslatedProperty(option, "name"),
      color: option.colorHexCode,
    })) || []
  );
}
