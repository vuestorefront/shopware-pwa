import {
  PageResolverResult,
  PageResolverProductResult,
  CmsPage,
} from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";

/**
 * technical URLs have always predefined format within a path
 */
const PRODUCT_PAGE_PREFIX = "/detail";
const NAVIGATION_PAGE_PREFIX = "/navigation";

const getProductTechnicalPath = (product: Partial<Product>): string =>
  `${PRODUCT_PAGE_PREFIX}/${product.id}`;
const getNavigationTechnicalPath = (
  cmsPage: PageResolverResult<CmsPage>
): string => `${NAVIGATION_PAGE_PREFIX}/${cmsPage.resourceIdentifier}`;

/**
 * @beta
 */
export function getCmsTechnicalPath(
  page: PageResolverResult<CmsPage> | PageResolverProductResult
): string | undefined {
  if (!page?.resourceType) {
    return;
  }

  switch (page.resourceType) {
    case "frontend.navigation.page":
      return getNavigationTechnicalPath(page as PageResolverResult<CmsPage>);
    case "frontend.detail.page":
      return getProductTechnicalPath(
        (page as PageResolverProductResult).product
      );
    default:
      throw Error(
        `Cannot extract a technical URL for provided page type: ${page.resourceType}`
      );
  }
}
