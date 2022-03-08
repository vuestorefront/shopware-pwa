import { CmsPageResponse, Product, Category } from "@shopware-pwa/commons";

/**
 * @public
 */
export function getCmsEntityByType(
  page?: CmsPageResponse | null
): Product | Category | undefined {
  if (!page?.resourceType) {
    return;
  }

  switch (page.resourceType) {
    case "frontend.navigation.page":
      return page.category;
    case "frontend.detail.page":
      return page.product;
  }
}
