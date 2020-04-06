import { apiService } from "../apiService";
import {
  getCheckoutOrderEndpoint,
  getCheckoutGuestOrderEndpoint,
} from "../endpoints";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import { CreateGuestOrderParams } from "@shopware-pwa/commons/interfaces/request/CreateGuestOrderParams";

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
 * @param email - customers's email
 * @alpha
 */
export async function createGuestOrder(
  params: CreateGuestOrderParams
): Promise<Order> {
  if (!params) {
    throw new Error(
      "createGuestOrder method accepts only CreateGuestOrderParams interface as an argument"
    );
  }

  const resp = await apiService.post(getCheckoutGuestOrderEndpoint(), params);

  return resp.data?.data;
}
