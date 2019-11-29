import { Product } from "@shopware-pwa/shopware-6-client";
import { UiProductProperty } from "@shopware-pwa/helpers";

export function getProductProperties({
  product
}: { product?: Product } = {}): UiProductProperty[] {
  if (!product || !product.properties) {
    return [];
  }

  const propertyList = product.properties.map(property => ({
    name: property.group ? property.group.name || "" : "",
    value: property.name
  }));

  return propertyList;
}
