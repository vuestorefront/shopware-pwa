import { Product } from "@shopware-pwa/shopware-6-client";
import { PropertyGroupOption } from "packages/shopware-6-client/src/interfaces/models/content/property/PropertyGroupOption";

export function getProductOption({
  product,
  attribute
}: { product?: Product; attribute?: string } = {}):
  | PropertyGroupOption
  | null
  | undefined {
  console.warn("getProductOption", product && product.options);
  return (
    product &&
    product.options &&
    product.options.find(
      option => option.group && option.group.name === attribute
    )
  );
}
