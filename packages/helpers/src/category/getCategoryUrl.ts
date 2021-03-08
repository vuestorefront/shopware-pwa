import { Category } from "@shopware-pwa/commons/interfaces/models/content/category/Category";

/**
 * Get URL for category.
 *
 * @beta
 */
export const getCategoryUrl = (category: Partial<Category>): string => {
  if (!category) return "/";
  switch (category.type) {
    case "link":
      return category.translated?.externalLink || category.externalLink || "/";
    case "folder":
      return "/";
    default:
      return category.seoUrls?.[0]?.seoPathInfo
        ? `/${category.seoUrls[0].seoPathInfo}`
        : category.id
        ? `/navigation/${category.id}`
        : "/";
  }
};

/**
 *
 * @beta
 */
export const isLinkCategory = (category: Partial<Category>): boolean =>
  category?.type === "link";
