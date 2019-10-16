import {
  getProductEndpoint,
  getProductDetailsEndpoint,
  getProductsIdsEndpoint
} from "../endpoints";
import { SearchResult } from "../interfaces/response/SearchResult";
import { Product } from "../interfaces/models/content/product/Product";
import { getParams } from "../helpers/paramsConverter";
import { apiService } from "../apiService";
import { SearchCriteria } from "../interfaces/search/SearchCriteria";

/**
 * @description Get default amount of products' ids
 */
export const getProductsIds = async function(): Promise<
  SearchResult<string[]>
> {
  const resp = await apiService.post(getProductsIdsEndpoint());
  return resp.data;
};

/**
 * @description Get default amount of products
 */

export const getProducts = async function(
  searchCriteria?: SearchCriteria
): Promise<SearchResult<Product[]>> {
  const resp = await apiService.get(`${getProductEndpoint()}`, {
    params: getParams(searchCriteria)
  });
  return resp.data;
};

/**
 * @description Get the product with passed productId
 */
export async function getProduct(productId: string): Promise<Product> {
  const resp = await apiService.get(getProductDetailsEndpoint(productId));
  return resp.data.data;
}
