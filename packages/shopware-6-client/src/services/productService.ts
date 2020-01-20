import {
  getProductEndpoint,
  getProductDetailsEndpoint,
  getProductsIdsEndpoint
} from "../endpoints";
import { SearchResult } from "@shopware-pwa/shopware-6-client/src/interfaces/response/SearchResult";
import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";
import { convertSearchCriteria } from "../helpers/searchConverter";
import { apiService } from "../apiService";
import { SearchCriteria } from "@shopware-pwa/shopware-6-client/src/interfaces/search/SearchCriteria";

/**
 * Get default amount of products' ids
 *
 * @alpha
 */
export const getProductsIds = async function(): Promise<SearchResult<
  string[]
>> {
  const resp = await apiService.post(getProductsIdsEndpoint());
  return resp.data;
};

/**
 * Get default amount of products
 *
 * @alpha
 */
export const getProducts = async function(
  searchCriteria?: SearchCriteria
): Promise<SearchResult<Product[]>> {
  const resp = await apiService.post(
    `${getProductEndpoint()}`,
    convertSearchCriteria(searchCriteria)
  );
  return resp.data;
};

/**
 * Get the product with passed productId
 *
 * @alpha
 */
export async function getProduct(
  productId: string,
  params: any = null
): Promise<Product> {
  const resp = await apiService.get(getProductDetailsEndpoint(productId), {
    params
  });
  return resp.data.data;
}
