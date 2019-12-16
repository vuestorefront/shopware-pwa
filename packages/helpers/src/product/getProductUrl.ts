import { Product } from "@shopware-pwa/shopware-6-client";

export function getProductUrl(product: Product | null): string {
  if (!product) return "/";
  // TODO change after fixing URL resolver
  // const seoUrl =
  //   product.seoUrls &&
  //   product.seoUrls.length &&
  //   product.seoUrls[0].seoPathInfo;
  // return seoUrl ? `/${seoUrl}` : `/detail/${product.id}`;
  return `/detail/${product.id}`;
}
