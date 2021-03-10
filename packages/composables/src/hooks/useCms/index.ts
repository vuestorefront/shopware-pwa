import { ref, Ref, computed, ComputedRef, watch } from "@vue/composition-api";
import { getCmsPage } from "@shopware-pwa/shopware-6-client";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { parseUrlQuery } from "@shopware-pwa/helpers";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import {
  CmsPage,
  PageResolverProductResult,
  PageResolverResult,
} from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";
import {
  getApplicationContext,
  useDefaults,
  useBreadcrumbs,
} from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../../appContext";
import merge from "lodash/merge";
import { PageBreadcrumb } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

/**
 * @beta
 */
export function useCms(
  rootContext: ApplicationVueContext
): {
  page: Ref<Readonly<PageResolverProductResult | PageResolverResult<CmsPage>>>;
  categoryId: ComputedRef<string>;
  loading: Ref<boolean>;
  search: (path: string, query?: any) => Promise<void>;
  error: Ref<any>;
  /**
   * @deprecated use useBreadcrumbs instead. Remove after v0.8
   */
  getBreadcrumbsObject: ComputedRef<PageBreadcrumb>;
} {
  const { vuexStore, apiInstance } = getApplicationContext(
    rootContext,
    "useCms"
  );

  const { getDefaults } = useDefaults(rootContext, "useCms");
  const { setBreadcrumbs } = useBreadcrumbs(rootContext);
  const error: Ref<any> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const page: ComputedRef<PageResolverResult<CmsPage>> = computed(() => {
    return vuexStore.getters.getPage;
  });
  // TODO: rename it to something more obvious, or just leav as resourceIdentifier
  // TODO: https://github.com/vuestorefront/shopware-pwa/issues/1308
  const categoryId = computed(() => {
    // each cms page is in relation one-to-one with categoryId (resourceIdentifier)
    return page.value && page.value.resourceIdentifier;
  });

  watch(
    page,
    (pageValue) => {
      setBreadcrumbs(Object.values(pageValue?.breadcrumb || []));
    },
    { immediate: true }
  );

  /**
   * @beta
   */
  const search = async (path: string, query?: any): Promise<void> => {
    loading.value = true;

    const criteria: SearchCriteria = parseUrlQuery(query);
    const searchCriteria = merge({}, getDefaults(), criteria);

    try {
      const result = await getCmsPage(path, searchCriteria, apiInstance);
      vuexStore.commit("SET_PAGE", result);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    page,
    categoryId,
    loading,
    search,
    error,
    /**
     * @deprecated use useBreadcrumbs instead. Remove after v0.8
     */
    getBreadcrumbsObject: computed(
      () => (page.value && (page.value as any).breadcrumb) || {}
    ),
  };
}
