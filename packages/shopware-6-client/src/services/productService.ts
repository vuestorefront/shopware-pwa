import {
  getProductEndpoint,
  getProductDetailsEndpoint,
  getProductsIdsEndpoint,
  getProductListingEndpoint,
} from "../endpoints";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { SearchResult } from "@shopware-pwa/commons/interfaces/response/SearchResult";
import { convertSearchCriteria, ApiType } from "../helpers/searchConverter";
import { apiService } from "../apiService";

/**
 * Get default amount of products' ids
 *
 * @throws ClientApiError
 * @alpha
 */
export const getProductsIds = async function (): Promise<SearchResult<
  string[]
>> {
  const resp = await apiService.post(getProductsIdsEndpoint());
  return resp.data;
};

/**
 * Get default amount of products
 *
 * @throws ClientApiError
 * @alpha
 */
export const getProducts = async function (
  searchCriteria?: SearchCriteria
): Promise<SearchResult<Product[]>> {
  const resp = await apiService.post(
    `${getProductEndpoint()}`,
    convertSearchCriteria(searchCriteria)
  );
  return resp.data;
};

/**
 * Get default amount of products and listing configuration for given category
 *
 * @throws ClientApiError
 * @alpha
 */
export const getCategoryProductsListing = async function (
  categoryId: string,
  searchCriteria?: SearchCriteria
): Promise<ProductListingResult> {
  const resp = await apiService.post(
    `${getProductListingEndpoint(categoryId)}`,
    convertSearchCriteria(searchCriteria, ApiType.store)
  );
  return resp.data;
};

/**
 * Get the product with passed productId
 *
 * @throws ClientApiError
 * @alpha
 */
export async function getProduct(
  productId: string,
  params: any = null
): Promise<Product> {
  const resp = await apiService.get(getProductDetailsEndpoint(productId), {
    params,
  });
  return resp.data.data;
}
