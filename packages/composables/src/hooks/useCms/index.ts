import { Ref, computed, ComputedRef, provide, inject } from "vue-demi";
import { getCmsPage } from "@shopware-pwa/shopware-6-client";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { CmsPageType } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";
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
  useVueContext,
} from "@shopware-pwa/composables";
import merge from "lodash/merge";
import { PageBreadcrumb } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";

/**
 * @beta
 */
export function useCms(options?: {
  /**
   * Additional context for CMS, use that if you need to display more that one CMS page on a single view (for example quickView).
   */
  cmsContextName?: string;
}): {
  page: ComputedRef<
    PageResolverProductResult | PageResolverResult<CmsPage> | null
  >;
  /**
   * @deprecated - use resourceIdentifier computed property instead
   */
  categoryId: ComputedRef<string | null>;
  resourceType: ComputedRef<CmsPageType | null>;
  resourceIdentifier: ComputedRef<string | null>;
  currentSearchPathKey: ComputedRef<string | null>;
  loading: Ref<boolean>;
  search: (path: string, query?: any) => Promise<void>;
  error: Ref<any>;
  /**
   * @deprecated use useBreadcrumbs instead. Remove after v0.8
   */
  getBreadcrumbsObject: ComputedRef<PageBreadcrumb>;
} {
  const COMPOSABLE_NAME = "useCms";

  // Handle CMS context
  const { isVueComponent } = useVueContext();
  const cmsContext =
    options?.cmsContextName || (isVueComponent && inject("swCmsContext", null));
  isVueComponent && provide("swCmsContext", cmsContext);

  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });

  const cacheKey = cmsContext
    ? `${contextName}(cms-${cmsContext})`
    : contextName;

  const { sharedRef } = useSharedState();
  const _searchPath = sharedRef<string>(`${cacheKey}-searchPath`);
  const _cmsError = sharedRef<any>(`${cacheKey}-cmsError`, null);
  const _cmsLoading = sharedRef(`${cacheKey}-cmsLoading`, false);

  const _storePage = sharedRef<
    PageResolverProductResult | PageResolverResult<CmsPage>
  >(`${cacheKey}-page`);

  const { getDefaults } = useDefaults(null, COMPOSABLE_NAME);
  const { setBreadcrumbs } = useBreadcrumbs();
  const page = computed(() => _storePage.value);
  /**
   * @deprecated - use resourceIdentifier computed property instead
   */
  const categoryId = computed(() => {
    // each cms page is in relation one-to-one with categoryId (resourceIdentifier)
    return page.value?.resourceIdentifier || null;
  });

  /**
   * @beta
   */
  const search = async (path: string, query?: any): Promise<void> => {
    _cmsLoading.value = true;
    _cmsError.value = null;
    _searchPath.value = path;

    const criteria: SearchCriteria = parseUrlQuery(query);
    const searchCriteria = merge({}, getDefaults(), criteria);

    try {
      const result = await getCmsPage(path, searchCriteria, apiInstance);
      _storePage.value = result;
      result?.breadcrumb && setBreadcrumbs(Object.values(result.breadcrumb));
    } catch (e) {
      const err: ClientApiError = e;
      _cmsError.value = err;
      _storePage.value = null;
    } finally {
      _cmsLoading.value = false;
    }
  };

  return {
    page,
    categoryId,
    loading: computed(() => _cmsLoading.value || false),
    search,
    currentSearchPathKey: computed(() => _searchPath.value),
    error: computed(() => _cmsError.value),
    /**
     * @deprecated use useBreadcrumbs instead. Remove after v0.8
     */
    getBreadcrumbsObject: computed(
      () => (page.value && (page.value as any).breadcrumb) || {}
    ),
    resourceType: computed(() => page.value?.resourceType || null),
    resourceIdentifier: categoryId,
  };
}
