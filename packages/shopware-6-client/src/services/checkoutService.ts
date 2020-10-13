import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  getCheckoutOrderEndpoint,
  getCheckoutGuestOrderEndpoint,
  getStoreOrderPaymentUrlEndpoint,
} from "../endpoints";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";

/**
 * Creates an order for logged in users
 * @beta
 */
export async function createOrder(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Order> {
  const resp = await contextInstance.invoke.post(getCheckoutOrderEndpoint());

  return resp.data;
}

/**
 * Creates an order for not logged in users
 * Should be used when the user is logged out, but has items in the cart
 * @beta
 */
export async function createGuestOrder(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Order> {
  const resp = await contextInstance.invoke.post(
    getCheckoutGuestOrderEndpoint(),
    {
      guest: true,
    }
  );

  return resp.data;
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
    getStoreOrderPaymentUrlEndpoint(),
    {
      orderId,
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
