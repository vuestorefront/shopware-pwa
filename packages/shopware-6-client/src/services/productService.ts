import {
  getProductEndpoint,
  getProductDetailsEndpoint,
  getProductsIdsEndpoint,
  getProductListingEndpoint,
} from "../endpoints";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import {
  SearchCriteria,
  ShopwareSearchParams,
} from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { SearchResult } from "@shopware-pwa/commons/interfaces/response/SearchResult";
import { convertSearchCriteria, ApiType } from "../helpers/searchConverter";
import { defaultInstance, ShopwareApiInstance } from "../apiService";

/**
 * Get default amount of products' ids
 *
 * @throws ClientApiError
 * @alpha
 */
export const getProductsIds = async function (
  options?: any,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<SearchResult<string[]>> {
  const resp = await contextInstance.invoke.post(getProductsIdsEndpoint());
  return resp.data;
};

/**
 * Get default amount of products
 *
 * @throws ClientApiError
 * @beta
 */
export const getProducts = async function (
  searchCriteria?: SearchCriteria,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<SearchResult<Product[]>> {
  const resp = await contextInstance.invoke.post(
    `${getProductEndpoint()}`,
    convertSearchCriteria({ searchCriteria, config: contextInstance.config })
  );
  return resp.data.data;
};

/**
 * Get default amount of products and listing configuration for given category
 *
 * @throws ClientApiError
 * @beta
 */
export const getCategoryProductsListing = async function (
  categoryId: string,
  searchCriteria?: SearchCriteria,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  const resp = await contextInstance.invoke.post(
    `${getProductListingEndpoint(categoryId)}`,
    convertSearchCriteria({
      searchCriteria,
      apiType: ApiType.store,
      config: contextInstance.config,
    }),
    {
      headers: {
        "sw-include-seo-urls": true,
      },
    }
  );
  return resp.data;
};

/**
 * Get default amount of products and listing configuration for given category
 *
 * @throws ClientApiError
 * @beta
 */
export const getCategoryProducts = async function (
  categoryId: string,
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  const resp = await contextInstance.invoke.post(
    `${getProductListingEndpoint(categoryId)}`,
    criteria
  );
  return resp.data;
};

/**
 * Get the product with passed productId
 *
 * @throws ClientApiError
 * @beta
 */
export async function getProduct(
  productId: string,
  params: any = null,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Product> {
  const resp = await contextInstance.invoke.get(
    getProductDetailsEndpoint(productId),
    {
      params,
    }
  );
  return resp.data.data;
}

/**
 * Add a review to specific product by its ID
 *
 * @throws ClientApiError
 * @beta
 */
export async function addProductReview(
  productId: string,
  productReviewData: {
    title: string;
    content: string;
    points: number;
  },
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(
    `${getProductDetailsEndpoint(productId)}/review`,
    productReviewData
  );
}
