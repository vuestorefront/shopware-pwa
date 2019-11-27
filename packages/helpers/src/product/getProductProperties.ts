import { Product } from "@shopware-pwa/shopware-6-client";
import { UiProductProperty } from "packages/global";

interface Parameters {
  product: Product
}

export default function getProductProperties(params: Parameters): UiProductProperty[] {
  const { product } = params
  if (!product.properties) {
    return []
  }

  const propertyList = product.properties.map(property => ({
    name: property.group ? (property.group.name || "") : "",
    value: property.name
  }))

  return propertyList
}