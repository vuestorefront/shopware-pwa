import { Product } from "@shopware-pwa/shopware-6-client";

interface Parameters {
  product: Product
}

export default function isProductSimple(params: Parameters): boolean {
  const { product } = params
  return !!product.parentId
}