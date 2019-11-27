import { Product } from "@shopware-pwa/shopware-6-client";

interface UiProductProperty {
  name: string
  value: string | null
}

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