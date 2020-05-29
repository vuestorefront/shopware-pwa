import { getSuggestSearchEndpoint, getSearchEndpoint } from "../endpoints";
import { apiService } from "../apiService";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { convertSearchCriteria, ApiType } from "../helpers/searchConverter";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";

/**
 * @throws ClientApiError
 * @beta
 */
export async function getSuggestedResults(
  term: string,
  searchCriteria?: SearchCriteria
): Promise<ProductListingResult> {
  const resp = await apiService.post(
    `${getSuggestSearchEndpoint()}?search=${term}`,
    {
      ...convertSearchCriteria(searchCriteria, ApiType.store),
    }
  );

  return resp.data;
}

/**
 * @throws ClientApiError
 * @beta
 */

export async function getResults(
  term: string,
  searchCriteria?: SearchCriteria
): Promise<ProductListingResult> {
  const resp = await apiService.post(`${getSearchEndpoint()}?search=${term}`, {
    ...convertSearchCriteria(searchCriteria, ApiType.store),
  });

  return resp.data;
}
