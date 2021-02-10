import { Category } from "@shopware-pwa/commons/interfaces/models/content/category/Category";

/**
 * Complements https://github.com/shopware/platform/blob/master/src/Core/Content/Category/CategoryDefinition.php#L50
 */
export const enum CATEGORY_TYPE {
  PAGE = "page",
  LINK = "link",
  FOLDER = "folder",
}

/**
 * Get URL for category.
 *
 * @beta
 */
export const getCategoryUrl = (category: Partial<Category>): string => {
  switch (category?.type) {
    case CATEGORY_TYPE.LINK:
      return category?.translated?.externalLink || "";
      break;
    case CATEGORY_TYPE.FOLDER:
      return "";
      break;
    case CATEGORY_TYPE.PAGE:
    default:
      return category?.seoUrls?.[0]?.seoPathInfo
        ? `/${category.seoUrls[0].seoPathInfo}`
        : `/navigation/${category.id}`;
  }
};

export const isLinkCategory = (category: Partial<Category>): boolean =>
  category?.type === CATEGORY_TYPE.LINK;
