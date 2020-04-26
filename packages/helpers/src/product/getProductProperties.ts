import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { UiProductProperty } from "../ui-interfaces";

/**
 * @alpha
 */
export function getProductProperties({
  product,
}: { product?: Product } = {}): UiProductProperty[] {
  const propertyList = product?.properties?.map((property) => ({
    name: property.group?.name || "",
    value: property.name,
  }));

  return propertyList || [];
}
