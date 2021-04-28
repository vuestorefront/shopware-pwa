import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  getCheckoutOrderEndpoint,
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
 * @param {string} orderId - Id of an order
 * @param {string} finishUrl - URL where the customer is redirected to after payment is done
 * @param {string} errorUrl - URL where the customer is redirected to after payment fails
 * @beta
 */
export async function getStoreOrderPaymentUrl(
  orderId: string,
  finishUrl?: string,
  errorUrl?: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<{
  redirectUrl: string | null;
  apiAlias: string;
}> {
  if (!orderId) {
    throw new Error("getStoreOrderPaymentUrl method requires orderId");
  }

  const resp = await contextInstance.invoke.get(
    getStoreOrderPaymentUrlEndpoint(),
    {
      params: { orderId, finishUrl, errorUrl },
    }
  );

  return resp.data;
}
