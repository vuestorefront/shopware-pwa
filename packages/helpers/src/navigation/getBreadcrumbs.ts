import { PageBreadcrumb } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

/**
 * @beta
 */
export interface Breadcrumb {
  text: string;
  link: string;
  route: {
    link: string;
  };
}

/**
 * @beta
 */
export function getBreadcrumbs(
  breadcrumbsObject: PageBreadcrumb,
  generateUrlFunc?: Function
) {
  return breadcrumbsObject
    ? Object.values(breadcrumbsObject).map((breadcrumb) => ({
        text: breadcrumb.name,
        link:
          typeof generateUrlFunc === "function"
            ? generateUrlFunc(breadcrumb.path)
            : breadcrumb.path,
        route: {
          link:
            typeof generateUrlFunc === "function"
              ? generateUrlFunc(breadcrumb.path)
              : breadcrumb.path,
        },
      }))
    : [];
}
