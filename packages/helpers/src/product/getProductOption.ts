import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { PropertyGroupOption } from "@shopware-pwa/commons/interfaces/models/content/property/PropertyGroupOption";

/**
 * @alpha
 */
export function getProductOption({
  product,
  attribute,
}: { product?: Product; attribute?: string } = {}):
  | PropertyGroupOption
  | undefined {
  return product?.options?.find(
    (option) =>
      option.group &&
      option.group.translated &&
      option.group.translated.name === attribute
  );
}
