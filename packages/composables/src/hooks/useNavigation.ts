import Vue from "vue";
import { reactive, computed, Ref } from "@vue/composition-api";
import { getStoreNavigation } from "@shopware-pwa/shopware-6-client";
import { NavigationElement } from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";
import { useDefaults, getApplicationContext } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";

/**
 * Complements https://github.com/shopware/platform/blob/master/src/Core/Content/Category/SalesChannel/NavigationRoute.php#L302
 */
const enum NAVIGATION_ALIAS {
  MAIN = "main-navigation",
  SERVICE = "service-navigation",
  FOOTER = "footer-navigation",
}

/**
 * interface for {@link useNavigation} composable
 *
 * Provides state for two navigation trees: Footer and Main Navigation
 *
 * @beta
 */
export interface IUseNavigation {
  routes: Ref<Readonly<any>>;
  navigationElements: Ref<Readonly<NavigationElement[]>>;
  fetchNavigationElements: (depth: number) => Promise<void>;
  mainNavigationRoutes: Ref<Readonly<any>>;
  mainNavigationElements: Ref<Readonly<NavigationElement[]>>;
  fetchMainNavigationElements: (depth: number) => Promise<void>;
  footerNavigationElements: Ref<Readonly<NavigationElement[]>>;
  fetchFooterNavigationElements: (depth: number) => Promise<void>;
  fetchRoutes: () => Promise<void>;
}

const sharedMainNavigation = Vue.observable({
  routes: null,
  navigationElements: [],
} as any);

const sharedFooterNavigation = Vue.observable({
  routes: null,
  navigationElements: [],
} as any);

/**
 * Composable for navigation. Options - {@link IUseNavigation}
 * @beta
 */
export const useNavigation = (
  rootContext: ApplicationVueContext
): IUseNavigation => {
  const { apiInstance } = getApplicationContext(rootContext, "useNavigation");

  const { getIncludesConfig, getAssociationsConfig } = useDefaults(
    rootContext,
    "useNavigation"
  );

  // Main Navigation (alias: main-navigation)
  const localMainNavigation = reactive(sharedMainNavigation);
  const mainNavigationElements = computed(
    () => localMainNavigation.navigationElements
  );
  const mainNavigationRoutes = computed(() => localMainNavigation.routes);

  /**
   * @deprecated
   */
  const routes = mainNavigationRoutes;

  /**
   * @deprecated
   */
  const navigationElements = mainNavigationElements;

  // Main Navigation (alias: footer-navigation)
  const localFooterNavigation = reactive(sharedFooterNavigation);
  const footerNavigationElements = computed(
    () => localFooterNavigation.navigationElements
  );

  /**
   * Merges navigation parameters with default navigation parameters (stateless)
   */
  const getNavigationParams = (
    params?: any,
    rootAlias: string = NAVIGATION_ALIAS.MAIN
  ) => {
    return Object.assign(
      {},
      {
        requestActiveId: rootAlias,
        requestRootId: rootAlias,
        searchCriteria: {
          configuration: {
            includes: getIncludesConfig(),
            associations: getAssociationsConfig(),
          },
        },
      },
      params
    );
  };

  /**
   * @deprecated
   * Fetches navigation routes
   */
  const fetchRoutes = async (params?: any): Promise<void> => {
    const navigationResponse = await getStoreNavigation(
      getNavigationParams(params),
      apiInstance
    );
    sharedMainNavigation.routes = navigationResponse;
  };

  /**
   * Fetches navigation elements
   */
  const fetchNavigationElements = async (
    navigationReference: any,
    depth: number,
    rootAlias: string = NAVIGATION_ALIAS.MAIN
  ) => {
    const navigationResponse = await getStoreNavigation(
      getNavigationParams(
        {
          depth,
        },
        rootAlias
      ),
      apiInstance
    );

    navigationReference.navigationElements = navigationResponse || [];
  };

  /**
   * Fetches main navigation elements
   */
  const fetchMainNavigationElements = async (depth: number): Promise<void> => {
    fetchNavigationElements(sharedMainNavigation, depth);
  };

  /**
   * @deprecated
   */
  const oldFetchNavigationElements = fetchMainNavigationElements;

  /**
   * Fetches footer navigation elements
   */
  const fetchFooterNavigationElements = async (depth: number) => {
    fetchNavigationElements(
      sharedFooterNavigation,
      depth,
      NAVIGATION_ALIAS.FOOTER
    );
  };

  return {
    routes,
    navigationElements,
    fetchNavigationElements: oldFetchNavigationElements,
    mainNavigationRoutes,
    mainNavigationElements,
    fetchMainNavigationElements,
    footerNavigationElements,
    fetchFooterNavigationElements,
    fetchRoutes,
  };
};
