import Vue from "vue";
import { reactive, computed, Ref, ref } from "@vue/composition-api";
import { getNavigation } from "@shopware-pwa/shopware-6-client";
import { getNavigationRoutes } from "@shopware-pwa/helpers";
import { NavigationElement } from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";

/**
 * @alpha
 */
export interface UseNavigation {
  routes: Ref<Readonly<any>>;
  hoveredNavigationItem: Ref<string>;
  navigationElements: NavigationElement[];
  getNavigationElements: (depth: number) => Promise<void>;
  fetchRoutes: () => Promise<void>;
}

const sharedNavigation = Vue.observable({
  routes: null,
  navigationElements: [],
} as any);

/**
 * @alpha
 */
export const useNavigation = (): UseNavigation => {
  const hoveredNavigationItem = ref("");
  const localNavigation = reactive(sharedNavigation);
  const routes = computed(() => localNavigation.routes);

  const fetchRoutes = async (params?: any): Promise<void> => {
    const { children } = await getNavigation(params);
    if (typeof children === "undefined") return;
    sharedNavigation.routes = getNavigationRoutes(children);
  };

  const getNavigationElements = async (depth: number) => {
    const { children } = await getNavigation({ depth });
    localNavigation.navigationElements.length = 0;
    localNavigation.navigationElements.push(...children);
  };

  return {
    routes,
    hoveredNavigationItem,
    navigationElements: localNavigation.navigationElements,
    getNavigationElements,
    fetchRoutes,
  };
};
