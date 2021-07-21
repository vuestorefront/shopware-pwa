import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  getCheckoutOrderEndpoint,
  handlePaymentEndpoint,
  getCustomerOrderEndpoint,
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
 * @param orderId - Id of an order
 * @param finishUrl - URL where the customer is redirected to after payment is done
 * @param errorUrl - URL where the customer is redirected to after payment fails
 * @beta
 */
export async function handlePayment(
  orderId: string,
  finishUrl?: string,
  errorUrl?: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<{
  redirectUrl: string | null;
  apiAlias: string;
}> {
  if (!orderId) {
    throw new Error("handlePayment method requires orderId");
  }

  const resp = await contextInstance.invoke.get(handlePaymentEndpoint(), {
    params: { orderId, finishUrl, errorUrl },
  });

  return resp.data;
}

/**
 * Get order details
 *
 * @throws ClientApiError
 * @beta
 */
export async function getOrderDetails(
  orderId: string,
  params?: Object,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Order | undefined> {
  const resp = await contextInstance.invoke.post(getCustomerOrderEndpoint(), {
    params: Object.assign({}, params, { "filter[id]": orderId }),
  });
  return resp.data.orders?.elements?.[0];
}
