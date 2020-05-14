import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

interface RangePrice {
  from: number | undefined;
  to: number | undefined;
}

/**
 * @alpha
 */
export function getProductPriceRange(product: Product): RangePrice {
  console.warn(product?.calculatedListingPrice)
  return { 
    from: product?.calculatedListingPrice?.from?.unitPrice,
    to: product?.calculatedListingPrice?.to?.unitPrice,
  }
}
