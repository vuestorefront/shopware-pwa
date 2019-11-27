import { Product } from "@shopware-pwa/shopware-6-client";
import { PropertyGroupOption } from "packages/shopware-6-client/src/interfaces/models/content/property/PropertyGroupOption";

interface Parameters {
  product: Product
  attribute: string
}

export default function getProductOption(params: Parameters): PropertyGroupOption | null | undefined {
  const { product, attribute } = params
  return product.options && product.options.find(option => option.group && option.group.name === attribute)
}