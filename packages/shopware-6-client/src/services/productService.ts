import {
  getProductEndpoint,
  getProductDetailsEndpoint,
  getProductListingEndpoint,
  getProductReviewsEndpoint,
} from "../endpoints";
import {
  ProductListingResult,
  Product,
  ShopwareSearchParams,
  ProductResponse,
  EntityResult,
  ProductReview,
} from "@shopware-pwa/commons";

import { defaultInstance, ShopwareApiInstance } from "../apiService";

/**
 * Get default amount of products
 *
 * @throws ClientApiError
 * @public
 */
export async function getProducts(
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<EntityResult<"product", Product[]>> {
  const resp = await contextInstance.invoke.post(`${getProductEndpoint()}`, {
    ...(criteria || {}),
  });
  return resp.data;
}

/**
 * Get default amount of products and listing configuration for given category
 *
 * @throws ClientApiError
 * @public
 */
export async function getCategoryProducts(
  categoryId: string,
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ProductListingResult> {
  const resp = await contextInstance.invoke.post(
    `${getProductListingEndpoint(categoryId)}`,
    criteria
  );
  return resp.data;
}

/**
 * Get the product with passed productId
 *
 * @throws ClientApiError
 * @public
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
 * @public
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

/**
 * Get product reviews
 *
 * @throws ClientApiError
 * @public
 */
export async function getProductReviews(
    productId: string,
    criteria?: ShopwareSearchParams,
    contextInstance: ShopwareApiInstance = defaultInstance
): Promise<EntityResult<"ProductReview", ProductReview[]>> {
  const resp = await contextInstance.invoke.post(`${getProductReviewsEndpoint(productId)}`, {
    ...(criteria || {}),
  });
  return resp.data;
}

