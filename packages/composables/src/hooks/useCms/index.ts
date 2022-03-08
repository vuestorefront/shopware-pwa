import { Ref, computed, ComputedRef, provide, inject, unref } from "vue-demi";
import { getCmsPage } from "@shopware-pwa/shopware-6-client";
import {
  SearchCriteria,
  ClientApiError,
  CmsPageResponse,
  CmsResourceType,
} from "@shopware-pwa/commons/interfaces";
import { _parseUrlQuery, getCmsEntityByType } from "@shopware-pwa/helpers";
import {
  getApplicationContext,
  useDefaults,
  useBreadcrumbs,
  useSharedState,
  useVueContext,
} from "@shopware-pwa/composables";
import merge from "lodash/merge";

/**
 * @beta
 */
export function useCms(params?: {
  /**
   * Additional context for CMS, use that if you need to display more that one CMS page on a single view (for example quickView).
   */
  cmsContextName?: string;
}): {
  page: ComputedRef<CmsPageResponse | null>;
  resourceType: ComputedRef<CmsResourceType | null>;
  resourceIdentifier: ComputedRef<string | null>;
  currentSearchPathKey: ComputedRef<string | null>;
  loading: Ref<boolean>;
  search: (path: string, query?: any) => Promise<void>;
  error: Ref<any>;
  metaTitle: ComputedRef<string>;
  metaDescription: ComputedRef<string>;
  metaKeywords: ComputedRef<string>;
  pageTitle: ComputedRef<string>;
} {
  const COMPOSABLE_NAME = "useCms";

  // Handle CMS context
  const { isVueComponent } = useVueContext();
  const cmsContext =
    params?.cmsContextName || (isVueComponent && inject("swCmsContext", null));
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

  const _storePage = sharedRef<CmsPageResponse>(`${cacheKey}-page`);

  const { getDefaults } = useDefaults({ defaultsKey: COMPOSABLE_NAME });
  const { setBreadcrumbs } = useBreadcrumbs();
  const page = computed(() => _storePage.value);

  const resourceIdentifier = computed(() => {
    // each cms page is in relation one-to-one with categoryId (resourceIdentifier)
    return page.value?.resourceIdentifier || null;
  });

  const getEntityObject = computed (() => getCmsEntityByType(unref(_storePage)) || {} as any)
  const pageTitle = computed(() => getEntityObject.value?.translated?.name);
  const metaTitle = computed(() => getEntityObject.value?.translated?.metaTitle);
  const metaDescription = computed( () => getEntityObject.value?.translated?.metaDescription );
  const metaKeywords = computed(() => getEntityObject.value?.translated?.keywords)

  /**
   * @beta
   */
  const search = async (path: string, query?: any): Promise<void> => {
    _cmsLoading.value = true;
    _cmsError.value = null;
    _searchPath.value = path;

    const criteria: SearchCriteria = _parseUrlQuery(query);
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
    loading: computed(() => _cmsLoading.value || false),
    search,
    currentSearchPathKey: computed(() => _searchPath.value),
    error: computed(() => _cmsError.value),
    resourceType: computed(() => page.value?.resourceType || null),
    resourceIdentifier,
    metaTitle,
    metaDescription,
    metaKeywords,
    pageTitle
  };
}
