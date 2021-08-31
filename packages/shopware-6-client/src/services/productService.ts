import {
  getProductEndpoint,
  getProductDetailsEndpoint,
  getProductListingEndpoint,
} from "../endpoints";
import { ProductListingResult } from "@shopware-pwa/commons/interfaces/response/ProductListingResult";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { ProductResponse } from "@shopware-pwa/commons/interfaces/response/ProductResult";
import { EntityResult } from "@shopware-pwa/commons/interfaces/response/EntityResult";

import { defaultInstance, ShopwareApiInstance } from "../apiService";

/**
 * Get default amount of products
 *
 * @throws ClientApiError
 * @beta
 */
export const getProducts = async function (
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<EntityResult<"product", Product[]>> {
  const resp = await contextInstance.invoke.post(`${getProductEndpoint()}`, {
    ...(criteria || {}),
  });
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
): Promise<ProductResponse> {
  const resp = await contextInstance.invoke.post(
    getProductDetailsEndpoint(productId),
    params
  );
  return resp.data;
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
