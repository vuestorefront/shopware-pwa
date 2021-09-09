import { Cart } from "@shopware-pwa/commons/interfaces/models/checkout/cart/Cart";
import {
  getCheckoutCartEndpoint,
  getCheckoutCartLineItemEndpoint,
} from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { ContextTokenResponse } from "@shopware-pwa/commons/interfaces/response/SessionContext";
import { LineItem } from "@shopware-pwa/commons/interfaces/models/checkout/cart/line-item/LineItem";

/**
 * When no sw-context-token given then this method return an empty cart with the new sw-context-token.
 *
 * When sw-context-token given then this method simply returns the current state of the cart.
 *
 * As the purpose of this method is not clear we recommend to use `getCart` method because its behaviour seems to be the same.
 *
 * @throws ClientApiError
 *
 * @beta
 */
export async function clearCart(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ContextTokenResponse> {
  const resp = await contextInstance.invoke.post(getCheckoutCartEndpoint());
  let contextToken = resp.data["sw-context-token"];
  return { contextToken };
}

/**
 * Gets the current cart for the sw-context-token.
 * @throws ClientApiError
 * @beta
 */
export async function getCart(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Cart> {
  const resp = await contextInstance.invoke.get(getCheckoutCartEndpoint());

  return resp.data;
}

/**
 * Adds specific quantity of the product to the cart by productId. It creates a new cart line item.
 *
 * Warning: This method does not change the state of the cart in any way if productId already exists in a cart. For changing the quantity use addQuantityToCartLineItem() or changeCartLineItemQuantity() methods.
 *
 * @throws ClientApiError
 * @beta
 */
export async function addProductToCart(
  productId: string,
  quantity?: number,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Cart> {
  const qty = quantity || 1;
  const item: Partial<LineItem> = {
    quantity: qty,
    type: "product",
    referencedId: productId,
    id: productId,
  };
  const resp = await contextInstance.invoke.post(
    getCheckoutCartLineItemEndpoint(),
    {
      items: [item],
    }
  );

  return resp.data;
}

/**
 * Changes the current quantity in specific cart line item to given quantity.
 *
 * Example: If current quantity is 3 and you pass 2 as quantity parameter, you will get a new cart's state with quantity 2.
 *
 * @throws ClientApiError
 * @beta
 */
export async function changeCartItemQuantity(
  itemId: string,
  newQuantity: number = 1,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Cart> {
  let params = {
    items: [
      {
        id: itemId,
        quantity: parseInt(newQuantity.toString(), 10),
      },
    ],
  };
  const resp = await contextInstance.invoke.patch(
    getCheckoutCartLineItemEndpoint(),
    params
  );

  return resp.data;
}

/**
 * Deletes the cart line item by id.
 *
 * This method may be used for deleting "product" type item lines as well as "promotion" type item lines.
 *
 * @throws ClientApiError
 * @beta
 */
export async function removeCartItem(
  itemId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Cart> {
  const resp = await contextInstance.invoke.delete(
    `${getCheckoutCartLineItemEndpoint()}?ids[]=${itemId}`
  );

  return resp.data;
}

/**
 * Adds new promotion code to the cart by its code.
 *
 * Promotion code is being added as separate cart item line.
 *
 * @throws ClientApiError
 * @beta
 */
export async function addPromotionCode(
  promotionCode: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Cart> {
  const item: Partial<LineItem> = {
    type: "promotion",
    referencedId: promotionCode,
  };
  const resp = await contextInstance.invoke.post(
    getCheckoutCartLineItemEndpoint(),
    {
      items: [item],
    }
  );

  return resp.data;
}

/**
 * Adds multiple items to the cart.
 * Accepts every type of cart item.
 *
 * @throws ClientApiError
 * @beta
 */
export async function addCartItems(
  items: Partial<LineItem>[],
  contextInstance: ShopwareApiInstance = defaultInstance
) {
  const resp = await contextInstance.invoke.post(
    getCheckoutCartLineItemEndpoint(),
    {
      items,
    }
  );

  return resp.data;
}
