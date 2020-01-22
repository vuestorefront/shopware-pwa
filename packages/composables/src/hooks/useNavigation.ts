import Vue from "vue";
import { reactive, computed } from "@vue/composition-api";
import { getNavigation } from "@shopware-pwa/shopware-6-client";

const sharedNavigation = Vue.observable({
  routeNames: null
} as any);
export const useNavigation = (): any => {
  const localNavigation = reactive(sharedNavigation);
  const routeNames = computed(() => localNavigation.routeNames);

  const fetchRouteNames = async (params?: any): Promise<void> => {
    const navigation = await getNavigation(params);
    if (typeof navigation.children === "undefined") return;
    sharedNavigation.routeNames = navigation.children.map(
      (element: { name: string }) => element.name
    );
  };

  const convertToSlug = (name: string): string => {
    if (typeof name !== "string") {
      return "";
    }
    const slug = name.replace(" ", "-");
    return `\/${slug.toLowerCase()}\/`;
  };

  return {
    routeNames,
    fetchRouteNames,
    convertToSlug
  };
};
