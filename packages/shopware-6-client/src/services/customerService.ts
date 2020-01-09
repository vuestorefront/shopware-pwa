import {
  getCustomerEndpoint,
  getCustomerAddressEndpoint,
  getCustomerUpdateEmailEndpoint,
  getCustomerUpdatePasswordEndpoint,
  getCustomerDefaultBillingAddressEndpoint,
  getCustomerDefaultShippingAddressEndpoint,
  getCustomerLogoutEndpoint,
  getCustomerLoginEndpoint
} from "../endpoints";
import { Customer } from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/customer/Customer";
import { apiService } from "../apiService";
import { CustomerAddress } from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/customer/CustomerAddress";
import { CustomerRegistrationParams } from "@shopware-pwa/shopware-6-client/src/interfaces/request/CustomerRegistrationParams";
import { ContextTokenResponse } from "@shopware-pwa/shopware-6-client/src/interfaces/response/ContextTokenResponse";

export interface CustomerRegisterResponse {
  data: string;
}

/**
 * Register a customer
 */
export async function register(
  params: CustomerRegistrationParams
): Promise<CustomerRegisterResponse> {
  const resp = await apiService.post(getCustomerEndpoint(), params);
  return resp.data;
}

/**
 * Get the context token for current user
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
 */
export async function logout(): Promise<void> {
  await apiService.post(getCustomerLogoutEndpoint());
}

/**
 * End up the session
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
 */
export async function getCustomerAddresses(): Promise<CustomerAddress[]> {
  const resp = await apiService.get(getCustomerAddressEndpoint());
  return resp.data.data;
}

/**
 * Get the customer's address by id
 */
export async function getCustomerAddress(
  addressId: string
): Promise<CustomerAddress> {
  const resp = await apiService.get(getCustomerAddressEndpoint(addressId));
  return resp.data.data;
}

export interface CustomerAddressParam extends Partial<CustomerAddress> {}

/**
 * Create an address and respond the new address's id
 */
export async function createCustomerAddress(
  params: CustomerAddressParam
): Promise<string> {
  const resp = await apiService.post(getCustomerAddressEndpoint(), params);
  return resp.data;
}

/**
 * Delete's the customer's address by id
 */
export async function deleteCustomerAddress(addressId: string): Promise<void> {
  await apiService.delete(getCustomerAddressEndpoint(addressId));
}

/**
 * Set address as default
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
 */
export async function setDefaultCustomerShippingAddress(
  addressId: string
): Promise<string> {
  const response = await apiService.patch(
    getCustomerDefaultShippingAddressEndpoint(addressId)
  );
  return response.data;
}

export interface CustomerUpdateEmailParam {
  email: string;
  emailConfirmation: string;
  password: string;
}

/**
 * Update a customer's email
 */
export async function updateEmail(
  params: CustomerUpdateEmailParam
): Promise<void> {
  await apiService.patch(getCustomerUpdateEmailEndpoint(), params);
}

export interface CustomerUpdatePasswordParam {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

/**
 * Update a customer's password
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
 * @alpha
 */
export async function updateProfile(
  params: CustomerUpdateProfileParam
): Promise<void> {
  await apiService.patch(getCustomerEndpoint(), params);
}
