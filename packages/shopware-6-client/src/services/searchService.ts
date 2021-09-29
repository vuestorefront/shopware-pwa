import { getSuggestSearchEndpoint, getSearchEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * Search for products based on criteria.
 * From: Shopware 6.4
 *
 * @public
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
 * @public
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
