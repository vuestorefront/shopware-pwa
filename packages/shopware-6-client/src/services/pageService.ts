import { getPageResolverEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  SearchCriteria,
  ShopwareSearchParams,
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { CmsPage } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { Aggregation } from "@shopware-pwa/commons/interfaces/search/Aggregation";

import { convertSearchCriteria } from "../helpers/searchConverter";

/**
 * @beta
 */
export interface PageResolverResult<T> {
  cmsPage: T;
  breadcrumb: {
    [id: string]: {
      name: string;
      path: string;
    };
  };
  listingConfiguration: any;
  resourceType: string;
  resourceIdentifier: string;
  apiAlias: string;
}

/**
 * @beta
 */
export interface PageResolverProductResult {
  product: Partial<Product>;
  aggregations: Aggregation[];
  resourceType: string;
  resourceIdentifier: string;
  cannonicalPathInfo: string;
  apiAlias: string;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export async function getPage(
  path: string,
  searchCriteria?: SearchCriteria,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<PageResolverResult<CmsPage>> {
  const resp = await contextInstance.invoke.post(
    getPageResolverEndpoint(),
    {
      path: path,
      ...convertSearchCriteria({
        searchCriteria,
        config: contextInstance.config,
      }),
    },
    {
      headers: {
        "sw-include-seo-urls": true,
      },
    }
  );

  return resp.data;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function getCmsPage(
  path: string,
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<PageResolverResult<CmsPage>> {
  const resp = await contextInstance.invoke.post(
    getPageResolverEndpoint(),
    {
      path: path,
      ...criteria,
    },
    {
      headers: {
        "sw-include-seo-urls": true,
      },
    }
  );

  return resp.data;
}

/**
 * @throws ClientApiError
 * @beta
 */
export async function getProductPage(
  path: string,
  searchCriteria?: SearchCriteria,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<PageResolverProductResult> {
  const resp = await contextInstance.invoke.post(getPageResolverEndpoint(), {
    path: path,
    ...convertSearchCriteria({
      searchCriteria,
      config: contextInstance.config,
    }),
  });

  return resp.data;
}
