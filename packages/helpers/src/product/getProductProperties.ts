import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { UiProductProperty } from "../ui-interfaces";

/**
 * Get product properties as ui-interfaces
 *
 * @public
 */
export function getProductProperties({
  product,
}: { product?: Product } = {}): UiProductProperty[] {
  const propertyList = product?.properties?.map((property) => ({
    name: property.group?.translated?.name || "",
    value: property.translated?.name || property.name,
  }));

  return propertyList || [];
}
