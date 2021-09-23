import { Category } from "@shopware-pwa/commons/interfaces/models/content/category/Category";
import { getTranslatedProperty } from "@shopware-pwa/helpers";

/**
 * Get URL for category.
 *
 * @beta
 */
export const getCategoryUrl = (category: Partial<Category>): string => {
  if (!category) return "/";
  switch (category.type) {
    case "link":
      return getTranslatedProperty(category, "externalLink") || "/";
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
