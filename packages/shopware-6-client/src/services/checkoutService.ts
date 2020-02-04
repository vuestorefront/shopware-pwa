import { apiService } from "../apiService";
import {
  getCheckoutOrderEndpoint,
  getCheckoutGuestOrderEndpoint
} from "../endpoints";
import { Order } from '@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/order/Order'

/**
* @alpha
*/
export async function createOrder(): Promise<Order> {
 const resp = await apiService.post(
  getCheckoutOrderEndpoint(),
 );

 return resp.data.data;
}

/**
* @alpha
*/
export async function createGuestOrder(
  email: string
): Promise<Order> {
  const resp = await apiService.post(
    getCheckoutGuestOrderEndpoint(),
    {
      email
    }
  );
 
  return resp.data.data;
 }