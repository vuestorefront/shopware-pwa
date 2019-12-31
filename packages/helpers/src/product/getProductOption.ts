import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";
import { PropertyGroupOption } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/property/PropertyGroupOption";

export function getProductOption({
  product,
  attribute
}: { product?: Product; attribute?: string } = {}):
  | PropertyGroupOption
  | null
  | undefined {
  return (
    product &&
    product.options &&
    product.options.find(
      option => option.group && option.group.name === attribute
    )
  );
}
