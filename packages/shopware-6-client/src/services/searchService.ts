import { getSuggestSearchEndpoint, getSearchEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import {
  convertSearchCriteria,
  ApiType,
  convertNewSearchCriteria,
} from "../helpers/searchConverter";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";

/**
 * @throws ClientApiError
 * @beta
 */
export async function getSuggestedResults(
  term: string,
  searchCriteria?: SearchCriteria,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
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
      ...convertNewSearchCriteria(searchCriteria),
    }
  );

  return resp.data;
}
