import { Product } from "@shopware-pwa/shopware-6-client";

interface Parameters {
  product: Product
}

export default function getProductRegularPrice(params: Parameters): number{
  const { product } = params
  return product.price ? product.price[0].gross : 0
}