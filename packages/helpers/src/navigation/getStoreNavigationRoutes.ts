import { StoreNavigationElement } from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";

/**
 * @beta
 */
export interface StoreNavigationRoute {
  routeLabel: string;
  routePath: string;
  isExternal: boolean;
  children?: StoreNavigationRoute[] | null;
}

/**
 * @beta
 * @deprecated use getCategoryUrl instead. Will be removed after v0.8
 */
export function getStoreNavigationRoutes(
  navigationElements: StoreNavigationElement[]
): StoreNavigationRoute[] {
  return navigationElements.map((element: StoreNavigationElement) => ({
    routeLabel: element.translated?.name || element.name,
    isExternal: !!element.externalLink,
    routePath:
      element.externalLink ||
      (element.seoUrls?.[0]?.seoPathInfo &&
        `/${element.seoUrls[0].seoPathInfo}`),
    children: element.children && getStoreNavigationRoutes(element.children),
  }));
}
