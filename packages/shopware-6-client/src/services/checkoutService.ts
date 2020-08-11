import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  getCheckoutOrderEndpoint,
  getCheckoutGuestOrderEndpoint,
  getOrderPaymentUrlEndpoint,
  getStoreOrderPaymentUrlEndpoint,
} from "../endpoints";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import { GuestOrderParams } from "@shopware-pwa/commons/interfaces/request/GuestOrderParams";

/**
 * Creates an order for logged in users
 * @alpha
 */
export async function createOrder(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Order> {
  const resp = await contextInstance.invoke.post(getCheckoutOrderEndpoint());

  return resp.data?.data;
}

/**
 * Creates an order for not logged in users
 * Should be used when the user is logged out, but has items in the cart
 * @alpha
 */
export async function createGuestOrder(
  params: GuestOrderParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Order> {
  if (!params) {
    throw new Error("createGuestOrder method requires GuestOrderParams");
  }

  const resp = await contextInstance.invoke.post(
    getCheckoutGuestOrderEndpoint(),
    params
  );

  return resp.data?.data;
}

/**
 * Get payment address to redirect user after placing order.
 * @throws ClientApiError
 * @beta
 */
export async function getOrderPaymentUrl(
  {
    orderId,
    finishUrl,
  }: {
    // mandatory param from placed order
    orderId: string;
    // address for redirection after successful payment
    finishUrl?: string;
  },
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<{ paymentUrl: string }> {
  if (!orderId) {
    throw new Error("getOrderPaymentUrl method requires orderId");
  }

  const resp = await contextInstance.invoke.post(
    getOrderPaymentUrlEndpoint(orderId),
    {
      finishUrl,
    }
  );

  return resp.data;
}

/**
 * @alpha
 */

export async function getStoreOrderPaymentUrl(
  orderId: string,

  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<{
  /** TODO:  Discover what is hidden under unknown property https://github.com/DivanteLtd/shopware-pwa/issues/999 */
  redirectResponse: unknown;
  apiAlias: string;
}> {
  if (!orderId) {
    throw new Error("getStoreOrderPaymentUrl method requires orderId");
  }

  const resp = await contextInstance.invoke.get(
    getStoreOrderPaymentUrlEndpoint(),
    {
      params: { orderId },
    }
  );

  return resp.data;
}
