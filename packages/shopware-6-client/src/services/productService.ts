import {
  getProductEndpoint,
  getProductDetailsEndpoint,
  getProductsIdsEndpoint
} from "../endpoints";
import { SearchResult } from "../interfaces/response/SearchResult";
import { Product } from "../interfaces/models/content/product/Product";
import { convertSearchCriteria } from "../helpers/searchConverter";
import { apiService } from "../apiService";
import { SearchCriteria } from "../interfaces/search/SearchCriteria";

/**
 * Get default amount of products' ids
 */
export const getProductsIds = async function(): Promise<
  SearchResult<string[]>
> {
  const resp = await apiService.post(getProductsIdsEndpoint());
  return resp.data;
};

/**
 * Get default amount of products
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
