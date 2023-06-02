import { Ref, computed, ComputedRef, provide, inject, unref } from "vue-demi";
import {
  SearchCriteria,
  ClientApiError,
  CmsPageResponse,
  SearchFilterType,
  SeoUrl,
  Category,
} from "@shopware-pwa/commons/interfaces";
import { _parseUrlQuery } from "@shopware-pwa/helpers";
import {
  getApplicationContext,
  useDefaults,
  useSharedState,
  useVueContext,
} from "@shopware-pwa/composables";
import merge from "lodash/merge";
import { getSeoUrl } from "@shopware-pwa/shopware-6-client/src/services/pageService";
import { invokePost } from "@shopware-pwa/shopware-6-client";
import { AxiosResponse } from "axios";

import { useCms as coreUseCms } from "@shopware-pwa/composables";

const SeoUrlEntityMap = {
  "frontend.detail.page": {
    entity: "product",
    endpoint: "product",
  },
  "frontend.navigation.page": {
    entity: "category",
    endpoint: "category",
  },
  "frontend.landing.page": {
    entity: "landingPage",
    endpoint: "landing-page",
  },
};

export function useCms65(params?: {
  /**
   * Additional context for CMS, use that if you need to display more that one CMS page on a single view (for example quickView).
   */
  cmsContextName?: string;
}) {
  const COMPOSABLE_NAME = "useCms";
  const coreFunctionality = coreUseCms();

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
  const seoUrlData = sharedRef<SeoUrl>(`${cacheKey}-seoData`);
  const { getDefaults } = useDefaults({ defaultsKey: COMPOSABLE_NAME });
  const resourceIdentifier = computed(() => {
    // each cms page is in relation one-to-one with categoryId (resourceIdentifier)
    return (seoUrlData.value as SeoUrl).foreignKey || null;
  });

  const search = async (path: string, query?: any): Promise<void> => {
    _cmsLoading.value = true;
    _cmsError.value = null;
    _searchPath.value = path;

    const criteria: SearchCriteria = _parseUrlQuery(query);
    const searchCriteria = merge({}, getDefaults(), criteria);

    try {
      const seoUrlsResult = await getSeoUrl(
        {
          filter: [
            {
              field: "seoPathInfo",
              value: path,
              type: SearchFilterType.EQUALS,
            },
          ],
        },
        apiInstance,
      );

      const foundUrl = seoUrlsResult?.elements?.[0];
      seoUrlData.value = foundUrl;

      const fetchedEntity: AxiosResponse = await invokePost(
        {
          address: `/store-api/${
            SeoUrlEntityMap[foundUrl.routeName]?.endpoint
          }/${foundUrl?.foreignKey}`,
          payload: {
            ...searchCriteria,
          },
        },
        apiInstance,
      );

      const isProduct =
        SeoUrlEntityMap[foundUrl.routeName]?.entity === "product";

      _storePage.value = {
        [SeoUrlEntityMap[foundUrl.routeName]?.entity]: isProduct
          ? fetchedEntity.data?.[SeoUrlEntityMap[foundUrl.routeName]?.entity]
          : fetchedEntity.data,
        resourceType: seoUrlData.value.routeName,
        resourceIdentifier: resourceIdentifier.value,
        cmsPage: isProduct
          ? fetchedEntity.data?.product?.cmsPage
          : fetchedEntity.data?.cmsPage || {},
        breadcrumb: null,
        apiAlias: "pwa_page_result",
      };
    } catch (e) {
      const err: ClientApiError = e;
      _cmsError.value = err;
      _storePage.value = null;
    } finally {
      _cmsLoading.value = false;
    }
  };

  return {
    ...coreFunctionality,
    search,
  };
}
