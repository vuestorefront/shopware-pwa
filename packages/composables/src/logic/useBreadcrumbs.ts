import Vue from "vue";
import { computed, ComputedRef, reactive } from "@vue/composition-api";
import { ApplicationVueContext, getApplicationContext } from "../appContext";
import { useCms } from "@shopware-pwa/composables";
import { getBreadcrumbs, Breadcrumb } from "@shopware-pwa/helpers";

const sharedBreadcrumbs = Vue.observable({
  list: null,
} as {
  list: Breadcrumb[] | null;
});

/**
 * @beta
 */
export const useBreadcrumbs = (
  rootContext: ApplicationVueContext
): {
  breadcrumbs: ComputedRef<Breadcrumb[]>;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  clear: () => void;
} => {
  getApplicationContext(rootContext, "useBreadcrumbs");
  const { getBreadcrumbsObject } = useCms(rootContext);
  let localBreadcrumbs = reactive(sharedBreadcrumbs);

  /**
   * Reset the breadcrumbs collection
   */
  const clear = () => {
    sharedBreadcrumbs.list = null;
  };
  /**
   * Set breadcrumbs manually
   */
  const setBreadcrumbs = (breadcrumbs: Breadcrumb[]) => {
    sharedBreadcrumbs.list = breadcrumbs;
  };

  return {
    clear,
    setBreadcrumbs,
    breadcrumbs: computed(
      () =>
        (Array.isArray(localBreadcrumbs.list) && localBreadcrumbs.list) ||
        getBreadcrumbs(getBreadcrumbsObject.value, rootContext.$routing.getUrl)
    ),
  };
};
