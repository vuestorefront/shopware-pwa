import {
  getCustomerEndpoint,
  getCustomerAddressEndpoint,
  getCustomerUpdateEmailEndpoint,
  getCustomerUpdatePasswordEndpoint,
  getCustomerDefaultBillingAddressEndpoint,
  getCustomerDefaultShippingAddressEndpoint,
  getCustomerLogoutEndpoint,
  getCustomerLoginEndpoint,
  getCustomerOrderEndpoint,
  getCustomerOrderDetailsEndpoint
} from "../endpoints";
import { Customer } from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/customer/Customer";
import { apiService } from "../apiService";
import { CustomerAddress } from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/customer/CustomerAddress";
import { CustomerRegistrationParams } from "@shopware-pwa/shopware-6-client/src/interfaces/request/CustomerRegistrationParams";
import { ContextTokenResponse } from "@shopware-pwa/shopware-6-client/src/interfaces/response/ContextTokenResponse";
import { Order } from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/order/Order";

/**
 * @alpha
 */
export interface CustomerRegisterResponse {
  data: string;
}

/**
 * Register a customer
 *
 * @alpha
 */
export async function register(
  params: CustomerRegistrationParams
): Promise<CustomerRegisterResponse> {
  const resp = await apiService.post(getCustomerEndpoint(), params);
  return resp.data;
}

/**
 * Get the context token for current user
 *
 * @alpha
 */
export async function login({
  username,
  password
}: { username?: string; password?: string } = {}): Promise<
  ContextTokenResponse
> {
  if (!username || !password)
    throw new Error("Provide username and password for login");
  const resp = await apiService.post(getCustomerLoginEndpoint(), {
    username,
    password
  });
  const contextToken = resp.data["sw-context-token"];
  return { contextToken };
}

/**
 * End up the session
 *
 * @alpha
 */
export async function logout(): Promise<void> {
  await apiService.post(getCustomerLogoutEndpoint());
}

/**
 * Get customer's object
 *
 * @alpha
 */
export async function getCustomer(): Promise<Customer | null> {
  try {
    const resp = await apiService.get(getCustomerEndpoint());
    return resp.data.data;
  } catch (e) {
    if (e.response && e.response.status === 403) return null;
    throw new Error("Unexpected getCustomerResponse.");
  }
}

/**
 * Get all customer's addresses
 *
 * @alpha
 */
export async function getCustomerAddresses(): Promise<CustomerAddress[]> {
  const resp = await apiService.get(getCustomerAddressEndpoint());
  return resp.data.data;
}

/**
 * Get all customer's orders
 *
 * @alpha
 */
export async function getCustomerOrders(): Promise<Order[]> {
  const resp = await apiService.get(getCustomerOrderEndpoint());
  return resp.data.data;
}

/**
 * Get order details
 *
 * @alpha
 */
export async function getCustomerOrderDetails(orderId: string): Promise<Order> {
  const resp = await apiService.get(getCustomerOrderDetailsEndpoint(orderId));
  return resp.data.data;
}

/**
 * Get the customer's address by id
 *
 * @alpha
 */
export async function getCustomerAddress(
  addressId: string
): Promise<CustomerAddress> {
  const resp = await apiService.get(getCustomerAddressEndpoint(addressId));
  return resp.data.data;
}

/**
 * @alpha
 */
export interface CustomerAddressParam extends Partial<CustomerAddress> {}

/**
 * Create an address and respond the new address's id
 *
 * @alpha
 */
export async function createCustomerAddress(
  params: CustomerAddressParam
): Promise<string> {
  const resp = await apiService.post(getCustomerAddressEndpoint(), params);
  return resp.data;
}

/**
 * Delete's the customer's address by id
 *
 * @alpha
 */
export async function deleteCustomerAddress(addressId: string): Promise<void> {
  await apiService.delete(getCustomerAddressEndpoint(addressId));
}

/**
 * Set address as default
 *
 * @alpha
 */
export async function setDefaultCustomerBillingAddress(
  addressId: string
): Promise<string> {
  const response = await apiService.patch(
    getCustomerDefaultBillingAddressEndpoint(addressId)
  );
  return response.data;
}

/**
 * Set address as default
 *
 * @alpha
 */
export async function setDefaultCustomerShippingAddress(
  addressId: string
): Promise<string> {
  const response = await apiService.patch(
    getCustomerDefaultShippingAddressEndpoint(addressId)
  );
  return response.data;
}

/**
 * @alpha
 */
export interface CustomerUpdateEmailParam {
  email: string;
  emailConfirmation: string;
  password: string;
}

/**
 * Update a customer's email
 *
 * @alpha
 */
export async function updateEmail(
  params: CustomerUpdateEmailParam
): Promise<void> {
  await apiService.patch(getCustomerUpdateEmailEndpoint(), params);
}

/**
 * @alpha
 */
export interface CustomerUpdatePasswordParam {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

/**
 * Update a customer's password
 *
 * @alpha
 */
export async function updatePassword(
  params: CustomerUpdatePasswordParam
): Promise<void> {
  await apiService.patch(getCustomerUpdatePasswordEndpoint(), params);
}

/**
 * @alpha
 */
export interface CustomerUpdateProfileParam {
  firstName: string;
  lastName: string;
  salutationId: string;
  title: string | null;
}

/**
 * Update a customer's profile data
 *
 * @alpha
 */
export async function updateProfile(
  params: CustomerUpdateProfileParam
): Promise<void> {
  await apiService.patch(getCustomerEndpoint(), params);
}
