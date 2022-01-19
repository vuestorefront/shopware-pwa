import { Product } from "@shopware-pwa/commons";
import { UiProductProperty } from "../ui-interfaces";
import { getTranslatedProperty } from "@shopware-pwa/helpers";

/**
 * Get product properties as ui-interfaces
 *
 * @public
 */
export function getProductProperties({
  product,
}: { product?: Product } = {}): UiProductProperty[] {
  const propertyList = product?.properties?.map((property) => ({
    name: getTranslatedProperty(property.group, "name"),
    value: getTranslatedProperty(property, "name"),
  }));

  return propertyList || [];
}
