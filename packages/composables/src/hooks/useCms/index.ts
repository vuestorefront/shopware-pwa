import { ref, Ref, computed, ComputedRef } from "@vue/composition-api";
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
  useSharedState,
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
  page: ComputedRef<
    PageResolverProductResult | PageResolverResult<CmsPage> | null
  >;
  categoryId: ComputedRef<string | null>;
  loading: Ref<boolean>;
  search: (path: string, query?: any) => Promise<void>;
  error: Ref<any>;
  /**
   * @deprecated use useBreadcrumbs instead. Remove after v0.8
   */
  getBreadcrumbsObject: ComputedRef<PageBreadcrumb>;
} {
  const { apiInstance, contextName } = getApplicationContext(
    rootContext,
    "useCms"
  );

  const { sharedRef } = useSharedState(rootContext);
  const _storePage = sharedRef<
    PageResolverProductResult | PageResolverResult<CmsPage>
  >(`${contextName}-page`);

  const { getDefaults } = useDefaults(rootContext, "useCms");
  const { setBreadcrumbs } = useBreadcrumbs(rootContext);
  const error: Ref<any> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const page = computed(() => _storePage.value);
  // TODO: rename it to something more obvious, or just leav as resourceIdentifier
  // TODO: https://github.com/vuestorefront/shopware-pwa/issues/1308
  const categoryId = computed(() => {
    // each cms page is in relation one-to-one with categoryId (resourceIdentifier)
    return page.value && page.value.resourceIdentifier;
  });

  /**
   * @beta
   */
  const search = async (path: string, query?: any): Promise<void> => {
    loading.value = true;

    const criteria: SearchCriteria = parseUrlQuery(query);
    const searchCriteria = merge({}, getDefaults(), criteria);

    try {
      const result = await getCmsPage(path, searchCriteria, apiInstance);
      _storePage.value = result;
      result?.breadcrumb && setBreadcrumbs(Object.values(result.breadcrumb));
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
