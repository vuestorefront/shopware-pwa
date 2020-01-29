import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";
import { PropertyGroupOption } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/property/PropertyGroupOption";

/**
 * @alpha
 */
export function getProductOption({
  product,
  attribute
}: { product?: Product; attribute?: string } = {}):
  | PropertyGroupOption
  | undefined {
  return product?.options?.find(
    option => option.group && option.group.name === attribute
  );
}
