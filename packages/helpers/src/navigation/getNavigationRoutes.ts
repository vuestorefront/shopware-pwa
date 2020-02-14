import { NavigationElement as SwNavigationElement } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/navigation/Navigation";

interface NavigationRoute {
  routeLabel: string;
  routePath: string;
}

/**
 * @alpha
 */
export function getNavigationRoutes(
  navigationElements: SwNavigationElement[]
): NavigationRoute[] {
  return navigationElements.map(
    (element: {
      children: SwNavigationElement[] | null;
      name: string;
      route: { path: string; resourceType: string };
    }) => ({
      routeLabel: element.name,
      routePath: element.route.path.charAt(0) !== '/' ? `/${element.route.path}` : element.route.path,
      children: element.children && getNavigationRoutes(element.children)
    })
  );
}
