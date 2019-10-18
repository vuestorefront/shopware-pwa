import { Cart } from "../interfaces/models/checkout/cart/Cart";
import {
  getCheckoutCartEndpoint,
  getCheckoutCartProductEndpoint,
  getCheckoutPromotionCodeEndpoint,
  getCheckoutCartLineItemEndpoint
} from "../endpoints";
import { apiService } from "../apiService";
import { ContextTokenResponse } from "../interfaces/response/ContextTokenResponse";

export async function createCart(): Promise<ContextTokenResponse> {
  const resp = await apiService.post(getCheckoutCartEndpoint());
  let contextToken = resp.data["sw-context-token"];
  return { contextToken };
}

export async function getCart(): Promise<Cart> {
  const resp = await apiService.get(getCheckoutCartEndpoint());

  return resp.data.data;
}

export async function addProduct(
  productId: string,
  newQuantity: number
): Promise<Cart> {
  let params = { quantity: newQuantity };
  const resp = await apiService.post(
    getCheckoutCartProductEndpoint(productId),
    params
  );

  return resp.data;
}

export async function addLineItem(
  itemId: string,
  addQuantity: number
): Promise<Cart> {
  let params = { type: "product", quantity: addQuantity };
  const resp = await apiService.post(
    getCheckoutCartLineItemEndpoint(itemId),
    params
  );

  return resp.data;
}

export async function updateLineItem(
  itemId: string,
  newQuantity: number
): Promise<Cart> {
  let params = { quantity: newQuantity };
  const resp = await apiService.patch(
    getCheckoutCartLineItemEndpoint(itemId),
    params
  );

  return resp.data;
}

export async function removeLineItem(itemId: string): Promise<Cart> {
  const resp = await apiService.delete(getCheckoutCartLineItemEndpoint(itemId));

  return resp.data;
}

export async function addCode(promotionCode: string): Promise<Cart> {
  const resp = await apiService.post(
    getCheckoutPromotionCodeEndpoint(promotionCode)
  );

  return resp.data;
}
