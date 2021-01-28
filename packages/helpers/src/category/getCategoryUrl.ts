import { Category } from "@shopware-pwa/commons/interfaces/models/content/category/Category";

/**
 * Get URL for category.
 *
 * @beta
 */
export const getCategoryUrl = (category: Partial<Category>): string => {
  if (!category?.externalLink && !category?.seoUrls?.length && !category?.id) {
    return "/";
  }

  const categoryUrl =
    category.seoUrls?.[0]?.seoPathInfo || `/navigation/${category.id}`;

  return (
    category.externalLink ||
    (categoryUrl.charAt(0) === "/" && categoryUrl) ||
    `/${categoryUrl}`
  );
};
