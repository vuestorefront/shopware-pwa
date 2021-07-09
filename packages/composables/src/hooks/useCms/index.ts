import { ref, Ref, computed, ComputedRef, watch } from "vue-demi";
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
export function useCms(rootContext: ApplicationVueContext): {
  page: ComputedRef<
    PageResolverProductResult | PageResolverResult<CmsPage> | null
  >;
  categoryId: ComputedRef<string | null>;
  searchPathKey: ComputedRef<string | null>;
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
  const _searchPath = sharedRef(`${contextName}-searchPath`, "");
  const _cmsError = sharedRef<any>(`${contextName}-cmsError`, null);
  const _cmsLoading = sharedRef(`${contextName}-cmsLoading`, false);

  const _storePage = sharedRef<
    PageResolverProductResult | PageResolverResult<CmsPage>
  >(`${contextName}-page`);

  const { getDefaults } = useDefaults(rootContext, "useCms");
  const { setBreadcrumbs } = useBreadcrumbs(rootContext);
  const page = computed(() => _storePage.value);
  // TODO: rename it to something more obvious, or just leav as resourceIdentifier
  // TODO: https://github.com/vuestorefront/shopware-pwa/issues/1308
  const categoryId = computed(() => {
    // each cms page is in relation one-to-one with categoryId (resourceIdentifier)
    return page.value && page.value.resourceIdentifier;
  });

  watch(
    page,
    (pageValue) => {
      pageValue?.breadcrumb &&
        setBreadcrumbs(Object.values(pageValue.breadcrumb));
    },
    { immediate: true }
  );

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
    searchPathKey: computed(() => _searchPath.value),
    error: computed(() => _cmsError.value),
    /**
     * @deprecated use useBreadcrumbs instead. Remove after v0.8
     */
    getBreadcrumbsObject: computed(
      () => (page.value && (page.value as any).breadcrumb) || {}
    ),
  };
}
