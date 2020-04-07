import { apiService } from "../apiService";
import {
  getCheckoutOrderEndpoint,
  getCheckoutGuestOrderEndpoint,
} from "../endpoints";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import { GuestOrderParams } from "@shopware-pwa/commons/interfaces/request/GuestOrderParams";

/**
 * Creates an order for logged in users
 * @alpha
 */
export async function createOrder(): Promise<Order> {
  const resp = await apiService.post(getCheckoutOrderEndpoint());

  return resp.data?.data;
}

/**
 * Creates an order for not logged in users
 * Should be used when the user is logged out, but has items in the cart
 * @alpha
 */
export async function createGuestOrder(
  params: GuestOrderParams
): Promise<Order> {
  if (!params) {
    throw new Error("createGuestOrder method requires GuestOrderParams");
  }

  const resp = await apiService.post(getCheckoutGuestOrderEndpoint(), params);

  return resp.data?.data;
}
