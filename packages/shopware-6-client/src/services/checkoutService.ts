import { apiService } from "../apiService";
import {
  getCheckoutOrderEndpoint,
  getCheckoutGuestOrderEndpoint,
} from "../endpoints";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";

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
export async function createGuestOrder(email: string): Promise<Order> {
  if (!email) {
    throw new Error(
      "createGuestOrder method requires email to be provided as a parameter"
    );
  }

  const resp = await apiService.post(getCheckoutGuestOrderEndpoint(), {
    email,
  });

  return resp.data?.data;
}
