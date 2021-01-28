import Vue from "vue";
import { reactive, computed, Ref } from "@vue/composition-api";
import { getStoreNavigation } from "@shopware-pwa/shopware-6-client";
import { NavigationElement } from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";
import { useDefaults, getApplicationContext } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";

/**
 * interface for {@link useNavigation} composable
 *
 * @beta
 */
export interface IUseNavigation {
  routes: Ref<Readonly<any>>;
  navigationElements: Ref<Readonly<NavigationElement[]>>;
  fetchNavigationElements: (depth: number) => Promise<void>;
  fetchRoutes: () => Promise<void>;
}

const sharedNavigation = Vue.observable({
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

  const localNavigation = reactive(sharedNavigation);
  const routes = computed(() => localNavigation.routes);
  const { getIncludesConfig, getAssociationsConfig } = useDefaults(
    rootContext,
    "useNavigation"
  );
  const getNavigationParams = (params?: any) => {
    return Object.assign(
      {},
      {
        requestActiveId: "main-navigation",
        requestRootId: "main-navigation",
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
  const fetchRoutes = async (params?: any): Promise<void> => {
    const navigationResponse = await getStoreNavigation(
      getNavigationParams(params),
      apiInstance
    );
    sharedNavigation.routes = navigationResponse;
  };

  const fetchNavigationElements = async (depth: number) => {
    const navigationResponse = await getStoreNavigation(
      getNavigationParams({
        depth,
      }),
      apiInstance
    );
    sharedNavigation.navigationElements = navigationResponse || [];
  };

  const navigationElements = computed(() => localNavigation.navigationElements);

  return {
    routes,
    navigationElements,
    fetchNavigationElements,
    fetchRoutes,
  };
};
