import { Category } from "@shopware-pwa/commons/interfaces/models/content/category/Category";

/**
 * Get url for category.
 *
 * @alpha
 */
export const getCategoryUrl = (category: Partial<Category>): string =>
  `/${category?.route?.path || ""}`;
