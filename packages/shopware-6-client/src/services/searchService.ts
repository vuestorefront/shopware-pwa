import { getSuggestSearchEndpoint, getSearchEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import {
  convertSearchCriteria,
  ApiType,
  convertShopwareSearchCriteria,
} from "../helpers/searchConverter";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import { deprecationWarning } from "@shopware-pwa/commons";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * @throws ClientApiError
 * @deprecated - please use searchSuggestedProducts instead
 * @alpha
 */
export async function getSuggestedResults(
  term: string,
  searchCriteria?: SearchCriteria,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  deprecationWarning({
    methodName: "getSuggestedResults",
    newMethodName: "searchSuggestedProducts",
    packageName: "shopware-6-client",
  });
  const resp = await contextInstance.invoke.post(
    `${getSuggestSearchEndpoint()}?search=${term}`,
    {
      ...convertSearchCriteria({
        searchCriteria,
        apiType: ApiType.store,
        config: contextInstance.config,
      }),
    }
  );

  return resp.data;
}

/**
 * @beta
 * @deprecated - this function will be replaced by getSearchResults what is a more appriopriate name.
 */
export async function getResults(
  term: string,
  searchCriteria?: SearchCriteria,
  contextInstance: ShopwareApiInstance = defaultInstance
) {
  deprecationWarning({
    methodName: "getResults",
    newMethodName: "getSearchResults",
    packageName: "shopware-6-client",
  });
  return getSearchResults(term, searchCriteria, contextInstance);
}

/**
 * @throws ClientApiError
 * @beta
 */

export async function getSearchResults(
  term: string,
  searchCriteria?: SearchCriteria,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  const resp = await contextInstance.invoke.post(
    `${getSearchEndpoint()}?search=${term}`,
    {
      ...convertShopwareSearchCriteria(searchCriteria),
    }
  );

  return resp.data;
}

/**
 * Search for products based on criteria.
 * From: Shopware 6.4
 *
 * @beta
 */
export async function searchProducts(
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  const resp = await contextInstance.invoke.post(
    `${getSearchEndpoint()}?search=${criteria?.query || ""}`,
    criteria
  );

  return resp.data;
}

/**
 * Search for suggested products based on criteria.
 * From: Shopware 6.4
 *
 * @beta
 */
export async function searchSuggestedProducts(
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  const resp = await contextInstance.invoke.post(
    `${getSuggestSearchEndpoint()}?search=${criteria?.query || ""}`,
    criteria
  );

  return resp.data;
}
