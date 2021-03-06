import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { getCheckoutOrderEndpoint, handlePaymentEndpoint } from "../endpoints";
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
