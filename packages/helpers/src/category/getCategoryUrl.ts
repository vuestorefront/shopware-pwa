import { Category } from "@shopware-pwa/commons";
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
      if (category.linkType === 'external') {
        return getTranslatedProperty(category, "externalLink")
      } else {
        return category.seoUrls?.[0]?.seoPathInfo
          ? `/${category.seoUrls[0].seoPathInfo}`
          : category.id
          ? `/navigation/${category.id}`
          : "/";
      }
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
