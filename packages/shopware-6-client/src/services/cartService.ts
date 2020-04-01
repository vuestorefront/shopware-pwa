import { Cart } from "@shopware-pwa/commons/interfaces/models/checkout/cart/Cart";
import {
  getCheckoutCartEndpoint,
  getCheckoutCartProductEndpoint,
  getCheckoutPromotionCodeEndpoint,
  getCheckoutCartLineItemEndpoint,
} from "../endpoints";
import { apiService } from "../apiService";
import { ContextTokenResponse } from "@shopware-pwa/commons/interfaces/response/ContextTokenResponse";
import { CartItemType } from "@shopware-pwa/commons/interfaces/cart/CartItemType";

/**
 * When no sw-context-token given then this method return an empty cart with the new sw-context-token.
 *
 * When sw-context-token given then this method simply returns the current state of the cart.
 *
 * As the purpose of this method is not clear we recommend to use getCart() method because its behaviour seems to be the same.
 *
 * @throws ClientApiError
 *
 * @alpha
 */
export async function clearCart(): Promise<ContextTokenResponse> {
  const resp = await apiService.post(getCheckoutCartEndpoint());
  let contextToken = resp.data["sw-context-token"];
  return { contextToken };
}

/**
 * Gets the current cart for the sw-context-token.
 * @throws ClientApiError
 * @alpha
 */
export async function getCart(): Promise<Cart> {
  const resp = await apiService.get(getCheckoutCartEndpoint());

  return resp.data.data;
}

/**
 * Adds specific quantity of the product to the cart by productId. It creates a new cart line item.
 *
 * Warning: This method does not change the state of the cart in any way if productId already exists in a cart. For changing the quantity use addQuantityToCartLineItem() or changeCartLineItemQuantity() methods.
 *
 * @throws ClientApiError
 * @alpha
 */
export async function addProductToCart(
  productId: string,
  quantity: number
): Promise<Cart> {
  const qty = quantity || 1;
  const resp = await apiService.post(
    getCheckoutCartProductEndpoint(productId),
    { quantity: qty }
  );

  return resp.data.data;
}

/**
 * Increases the current quantity in specific cart line item by given quantity.
 *
 * Example: If current quantity is 3 and you pass 2 as quantity parameter, you will get a new cart's state with quantity 5.
 *
 * @throws ClientApiError
 * @alpha
 */
export async function addCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<Cart> {
  let params = { type: CartItemType.PRODUCT, quantity: quantity };
  const resp = await apiService.post(
    getCheckoutCartLineItemEndpoint(itemId),
    params
  );

  return resp.data.data;
}

/**
 * Changes the current quantity in specific cart line item to given quantity.
 *
 * Example: If current quantity is 3 and you pass 2 as quantity parameter, you will get a new cart's state with quantity 2.
 *
 * @throws ClientApiError
 * @alpha
 */
export async function changeCartItemQuantity(
  itemId: string,
  newQuantity: number = 1
): Promise<Cart> {
  let params = { quantity: parseInt(newQuantity.toString()) };
  const resp = await apiService.patch(
    getCheckoutCartLineItemEndpoint(itemId),
    params
  );

  return resp.data.data;
}

/**
 * Deletes the cart line item by id.
 *
 * This method may be used for deleting "product" type item lines as well as "promotion" type item lines.
 *
 * @throws ClientApiError
 * @alpha
 */
export async function removeCartItem(itemId: string): Promise<Cart> {
  const resp = await apiService.delete(getCheckoutCartLineItemEndpoint(itemId));

  return resp.data.data;
}

/**
 * Adds new promotion code to the cart by its code.
 *
 * Promotion code is being added as separate cart item line.
 *
 * @throws ClientApiError
 * @alpha
 */
export async function addPromotionCode(promotionCode: string): Promise<Cart> {
  const resp = await apiService.post(
    getCheckoutPromotionCodeEndpoint(promotionCode)
  );

  return resp.data.data;
}
