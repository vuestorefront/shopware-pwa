import Vue from "vue";
import { reactive, computed } from "@vue/composition-api";
import { getNavigation } from "@shopware-pwa/shopware-6-client";
import { getNavigationRoutes } from "@shopware-pwa/helpers";

const sharedNavigation = Vue.observable({
  routes: null,
} as any);

/**
 * @alpha
 */
export const useNavigation = (): any => {
  const localNavigation = reactive(sharedNavigation);
  const routes = computed(() => localNavigation.routes);

  const fetchRoutes = async (params?: any): Promise<void> => {
    const navigation = await getNavigation(params);
    if (typeof navigation.children === "undefined") return;
    sharedNavigation.routes = getNavigationRoutes(navigation.children);
  };

  return {
    routes,
    fetchRoutes,
  };
};
