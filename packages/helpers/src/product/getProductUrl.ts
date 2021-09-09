import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * Get product url. The priority is SEO url and then technical url.
 *
 * @public
 */
export function getProductUrl(product: Product | null): string {
  if (!product) return "/";
  const seoUrl = product.seoUrls?.[0]?.seoPathInfo;
  return seoUrl ? `/${seoUrl}` : `/detail/${product.id}`;
}
