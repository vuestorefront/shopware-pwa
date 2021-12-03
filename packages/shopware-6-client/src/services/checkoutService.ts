import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  getCheckoutOrderEndpoint,
  handlePaymentEndpoint,
  getCustomerOrderEndpoint,
  getCancelOrderEndpoint,
  getChangeOrderPaymentMethodEndpoint,
} from "../endpoints";
import { CreateOrderParams } from "@shopware-pwa/commons/interfaces/request/CreateOrder";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import { OrderState } from "@shopware-pwa/commons/interfaces/models/checkout/order/OrderState";
import { SearchFilterType } from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { ShopwareSearchParams } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";

/**
 * Creates an order for logged in and guest users
 * @public
 */
export async function createOrder(
  params?: CreateOrderParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Order> {
  const resp = await contextInstance.invoke.post(
    getCheckoutOrderEndpoint(),
    params
  );

  return resp.data;
}

/**
 * @param orderId - Id of an order
 * @param finishUrl - URL where the customer is redirected to after payment is done
 * @param errorUrl - URL where the customer is redirected to after payment fails
 * @public
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
 * @public
 */
export async function getOrderDetails(
  orderId: string,
  params?: ShopwareSearchParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Order | undefined> {
  const resp = await contextInstance.invoke.post(
    getCustomerOrderEndpoint(),
    Object.assign({}, params, {
      filter: [
        {
          // filter order's collection by given id
          type: SearchFilterType.EQUALS,
          field: "id",
          value: orderId,
        },
      ],
    })
  );
  return resp.data?.orders?.elements?.[0];
}

/**
 * Cancel an order
 *
 * @throws ClientApiError
 * @public
 */
export async function cancelOrder(
  orderId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<OrderState> {
  const resp = await contextInstance.invoke.post(getCancelOrderEndpoint(), {
    orderId,
  });
  return resp.data;
}

/**
 * Change payment method for given order
 *
 * @throws ClientApiError
 * @public
 */
export async function changeOrderPaymentMethod(
  orderId: string,
  paymentMethodId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<{
  apiAlias: string;
  success: boolean;
}> {
  const resp = await contextInstance.invoke.post(
    getChangeOrderPaymentMethodEndpoint(),
    {
      orderId,
      paymentMethodId,
    }
  );
  return resp.data;
}
