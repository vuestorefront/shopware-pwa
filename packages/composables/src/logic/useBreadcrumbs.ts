import {
  computed,
  ComputedRef,
  Ref,
  getCurrentInstance,
  inject,
} from "vue-demi";
import { ApplicationVueContext, getApplicationContext } from "../appContext";
import { Breadcrumb } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";
import { useSharedState, useVueContext } from "@shopware-pwa/composables";

/**
 * Composable for displaying and setting breadcrumbs for page.
 *
 * @beta
 */
export function useBreadcrumbs(
  rootContext?: ApplicationVueContext | null | undefined,
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
  const COMPOSABLE_NAME = "useBreadcrumbs";

  // Handle CMS context to be able to show different breadcrumbs for different CMS pages.
  const { isVueComponent } = useVueContext();
  const cmsContext = isVueComponent && inject("swCmsContext", null);

  const contextName = COMPOSABLE_NAME;

  const { i18n } = getApplicationContext(null, contextName);
  const { sharedRef } = useSharedState();

  const cacheKey = cmsContext
    ? `${contextName}(cms-${cmsContext})`
    : contextName;

  const _sharedBreadcrumbs: Ref<Breadcrumb[] | null> = sharedRef(
    `${cacheKey}-breadcrumbs`
  );

  /**
   * Reset the breadcrumbs collection
   */
  const clear = () => {
    _sharedBreadcrumbs.value = [];
  };
  /**
   * Set breadcrumbs
   */
  const setBreadcrumbs = (breadcrumbs: Breadcrumb[]): void => {
    _sharedBreadcrumbs.value = breadcrumbs || [];
  };

  return {
    clear,
    setBreadcrumbs,
    /**
     * List of current breadcrumbs
     */
    breadcrumbs: computed(() => {
      if (!!params?.hideHomeLink || !_sharedBreadcrumbs.value?.length)
        return _sharedBreadcrumbs.value || [];
      return [
        {
          name: i18n.t("Home"),
          path: "/",
        },
        ..._sharedBreadcrumbs.value,
      ];
    }),
  };
}
