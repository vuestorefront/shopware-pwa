import Vue from "vue";
import { computed, ComputedRef, reactive } from "@vue/composition-api";
import { ApplicationVueContext, getApplicationContext } from "../appContext";
import { Breadcrumb } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

const sharedBreadcrumbs = Vue.observable({
  list: [],
} as {
  list: Breadcrumb[];
});

/**
 * Composable for displaying and setting breadcrumbs for page.
 *
 * @beta
 */
export function useBreadcrumbs(
  rootContext: ApplicationVueContext,
  params?: {
    /**
     * Define if you want to show/hide link to Home in breadcrumbs.
     *
     * By default we show Home link.
     */
    hideHomeLink: boolean;
  }
): {
  breadcrumbs: ComputedRef<Breadcrumb[]>;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  clear: () => void;
} {
  const { i18n } = getApplicationContext(rootContext, "useBreadcrumbs");
  let localBreadcrumbs = reactive(sharedBreadcrumbs);

  /**
   * Reset the breadcrumbs collection
   */
  const clear = () => {
    sharedBreadcrumbs.list = [];
  };
  /**
   * Set breadcrumbs
   */
  const setBreadcrumbs = (breadcrumbs: Breadcrumb[]): void => {
    sharedBreadcrumbs.list = breadcrumbs || [];
  };

  return {
    clear,
    setBreadcrumbs,
    /**
     * List of current breadcrumbs
     */
    breadcrumbs: computed(() => {
      if (!!params?.hideHomeLink || !localBreadcrumbs.list.length)
        return localBreadcrumbs.list;
      return [
        {
          name: i18n.t("Home"),
          path: "/",
        },
        ...localBreadcrumbs.list,
      ];
    }),
  };
}
