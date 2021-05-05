import { getSuggestSearchEndpoint, getSearchEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { convertShopwareSearchCriteria } from "../helpers/searchConverter";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * @throws ClientApiError
 * @deprecated use searchProducts instead
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
