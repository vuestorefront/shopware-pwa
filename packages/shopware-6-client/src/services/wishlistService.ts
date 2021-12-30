/**
 * WISHLIST feature must be activated in Shopware 6
 */
import {
  getAddWishlistProductEndpoint,
  getGetWishlistProductsEndpoint,
  getMergeWishlistProductsEndpoint,
  getRemoveWishlistProductEndpoint,
} from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { CustomerWishlistResponse } from "@shopware-pwa/commons/interfaces/models/content/wishlist/CustomerWishlist";

/**
 * Add a product with a specific ID to the wishlist
 *
 * @remarks Only for logged-in users
 * @throws ClientApiError
 * @public
 */
export async function addWishlistProduct(
  productId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<{
  apiAlias: string;
  success: boolean;
}> {
  const resp = await contextInstance.invoke.post(
    getAddWishlistProductEndpoint(productId)
  );

  return resp?.data;
}

/**
 * Fetch a current Wishlist with added products
 *
 * @remarks Only for logged-in users
 * @throws ClientApiError
 * @public
 */
export async function getWishlistProducts(
  criteria?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<CustomerWishlistResponse> {
  const resp = await contextInstance.invoke.post(
    getGetWishlistProductsEndpoint(),
    criteria
  );

  return resp?.data;
}

/**
 * Delete a product with a specific ID from the wishlist
 *
 * @remarks Only for logged-in users
 * @throws ClientApiError
 * @public
 */
export async function removeWishlistProduct(
  productId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<{
  apiAlias: string;
  success: boolean;
}> {
  const resp = await contextInstance.invoke.delete(
    getRemoveWishlistProductEndpoint(productId)
  );

  return resp?.data;
}

/**
 * Merge the current Wishlist with a products with provided IDs
 *
 * @remarks Only for logged-in users
 * @throws ClientApiError
 * @public
 */
export async function mergeWishlistProducts(
  productIds: string[],
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<{
  apiAlias: string;
  success: boolean;
}> {
  const resp = await contextInstance.invoke.post(
    getMergeWishlistProductsEndpoint(),
    { productIds }
  );

  return resp?.data;
}
