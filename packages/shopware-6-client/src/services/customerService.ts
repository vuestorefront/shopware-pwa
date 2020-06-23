import {
  getCustomerEndpoint,
  getCustomerAddressEndpoint,
  getCustomerUpdateEmailEndpoint,
  getCustomerRegisterEndpoint,
  getCustomerDetailsUpdateEndpoint,
  getCustomerUpdatePasswordEndpoint,
  getCustomerResetPasswordEndpoint,
  getCustomerDefaultBillingAddressEndpoint,
  getCustomerDefaultShippingAddressEndpoint,
  getCustomerLogoutEndpoint,
  getCustomerLoginEndpoint,
  getCustomerOrderEndpoint,
} from "../endpoints";
import { Customer } from "@shopware-pwa/commons/interfaces/models/checkout/customer/Customer";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import { CustomerAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/CustomerAddress";
import { CustomerRegistrationParams } from "@shopware-pwa/commons/interfaces/request/CustomerRegistrationParams";
import { ContextTokenResponse } from "@shopware-pwa/commons/interfaces/response/SessionContext";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";

/**
 * @alpha
 */
export interface CustomerRegisterResponse {
  data: string;
}

/**
 * Register a customer
 *
 * @throws ClientApiError
 * @alpha
 */
export async function register(
  params: CustomerRegistrationParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<CustomerRegisterResponse> {
  const resp = await contextInstance.invoke.post(
    getCustomerRegisterEndpoint(),
    params
  );
  return resp.data;
}

/**
 * Login user to shopware instance.
 *
 * @throws ClientApiError
 * @beta
 */
export async function login(
  { username, password }: { username?: string; password?: string } = {},
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ContextTokenResponse> {
  if (!username || !password) {
    throw new Error("Provide username and password for login");
  }
  const resp = await contextInstance.invoke.post(getCustomerLoginEndpoint(), {
    username,
    password,
  });
  const contextToken =
    resp.data["sw-context-token"] || resp.data["contextToken"];
  return { contextToken };
}

/**
 * End up the user session.
 *
 * @throws ClientApiError
 * @beta
 */
export async function logout(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(getCustomerLogoutEndpoint());
}

/**
 * Get customer's object
 *
 * @throws ClientApiError
 * @beta
 */
export async function getCustomer(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Customer | null> {
  try {
    // TODO: implement generic parameter converter for GET query string; related issue #568
    const associationsQuery = "?associations[salutation][]";
    const resp = await contextInstance.invoke.get(
      `${getCustomerEndpoint()}${associationsQuery}`
    );
    return resp.data;
  } catch (e) {
    if (e.statusCode === 403) return null;
    throw new Error("Unexpected getCustomerResponse. " + e);
  }
}

/**
 * Get all customer's addresses
 *
 * @throws ClientApiError
 * @beta
 */
export async function getCustomerAddresses(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<CustomerAddress[]> {
  const resp = await contextInstance.invoke.get(getCustomerAddressEndpoint());
  return resp.data.data;
}

/**
 * Get all customer's orders
 *
 * @throws ClientApiError
 * @beta
 */
export async function getCustomerOrders(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Order[]> {
  const resp = await contextInstance.invoke.get(
    `${getCustomerOrderEndpoint()}?sort=-createdAt`
  );
  return resp.data.orders?.elements || [];
}

/**
 * Get order details
 *
 * @throws ClientApiError
 * @alpha
 */
export async function getCustomerOrderDetails(
  orderId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Order | undefined> {
  if (!orderId) {
    return;
  }

  const resp = await contextInstance.invoke.get(
    `${getCustomerOrderEndpoint()}?filter[id]=${orderId}&associations[lineItems][]&associations[addresses][]&associations[transactions][]&associations[deliveries][]`
  );
  return resp.data.orders?.elements?.[0];
}

/**
 * Get the customer's address by id
 *
 * @throws ClientApiError
 * @alpha
 */
export async function getCustomerAddress(
  addressId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<CustomerAddress> {
  const resp = await contextInstance.invoke.get(
    getCustomerAddressEndpoint(addressId)
  );
  return resp.data.data;
}

/**
 * Create an address and respond the new address's id
 *
 * @throws ClientApiError
 * @alpha
 */
export async function createCustomerAddress(
  params: Partial<CustomerAddress>,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<string> {
  const resp = await contextInstance.invoke.post(
    getCustomerAddressEndpoint(),
    params
  );
  return resp.data;
}

/**
 * Delete's the customer's address by id
 *
 * @throws ClientApiError
 * @alpha
 */
export async function deleteCustomerAddress(
  addressId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.delete(getCustomerAddressEndpoint(addressId));
}

/**
 * Set address as default
 *
 * @throws ClientApiError
 * @alpha
 */
export async function setDefaultCustomerBillingAddress(
  addressId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<string> {
  const response = await contextInstance.invoke.patch(
    getCustomerDefaultBillingAddressEndpoint(addressId)
  );
  return response.data;
}

/**
 * Set address as default
 *
 * @throws ClientApiError
 * @alpha
 */
export async function setDefaultCustomerShippingAddress(
  addressId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<string> {
  const response = await contextInstance.invoke.patch(
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
 * @throws ClientApiError
 * @alpha
 */
export async function updateEmail(
  params: CustomerUpdateEmailParam,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(getCustomerUpdateEmailEndpoint(), params);
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
 * @throws ClientApiError
 * @alpha
 */
export async function updatePassword(
  params: CustomerUpdatePasswordParam,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(
    getCustomerUpdatePasswordEndpoint(),
    params
  );
}

/**
 * @alpha
 */
export interface CustomerResetPasswordParam {
  email: string;
  storefrontUrl?: string;
}

/**
 * Reset a customer's password
 *
 * @throws ClientApiError
 * @alpha
 */
export async function resetPassword(
  params: CustomerResetPasswordParam,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  if (params && !params.storefrontUrl) {
    params.storefrontUrl = contextInstance.config.endpoint;
  }

  await contextInstance.invoke.post(getCustomerResetPasswordEndpoint(), params);
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
 * @throws ClientApiError
 * @alpha
 */
export async function updateProfile(
  params: CustomerUpdateProfileParam,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(getCustomerDetailsUpdateEndpoint(), params);
}
