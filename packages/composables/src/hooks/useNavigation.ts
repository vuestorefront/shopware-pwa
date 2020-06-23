import Vue from "vue";
import { reactive, computed, Ref } from "@vue/composition-api";
import { getNavigation } from "@shopware-pwa/shopware-6-client";
import { getNavigationRoutes } from "@shopware-pwa/helpers";
import { NavigationElement } from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";
import { getApplicationContext } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";

/**
 * interface for {@link useNavigation} composable
 *
 * @beta
 */
export interface IUseNavigation {
  routes: Ref<Readonly<any>>;
  navigationElements: NavigationElement[];
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

  const fetchRoutes = async (params?: any): Promise<void> => {
    const { children } = await getNavigation(params, apiInstance);
    if (typeof children === "undefined") return;
    sharedNavigation.routes = getNavigationRoutes(children);
  };

  const fetchNavigationElements = async (depth: number) => {
    const { children } = await getNavigation({ depth }, apiInstance);
    localNavigation.navigationElements.length = 0;
    localNavigation.navigationElements.push(...children);
  };

  return {
    routes,
    navigationElements: localNavigation.navigationElements,
    fetchNavigationElements,
    fetchRoutes,
  };
};
