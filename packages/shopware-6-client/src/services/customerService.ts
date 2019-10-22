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
import { Customer } from "../interfaces/models/checkout/customer/Customer";
import { apiService } from "../apiService";
import { CustomerAddress } from "../interfaces/models/checkout/customer/CustomerAddress";
import { CustomerRegistrationParams } from "../interfaces/request/CustomerRegistrationParams";
import { update } from "..";
import { UpdateContextResponse } from "../interfaces/response/UpdateContextResponse";

interface CustomerRegisterResponse {
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

interface CustomerLoginParam {
  username: string;
  password: string;
}

/**
 * Get the context token for current user
 */
export async function login(
  params: CustomerLoginParam
): Promise<UpdateContextResponse> {
  const resp = await apiService.post(getCustomerLoginEndpoint(), params);
  const contextToken = resp.data["sw-context-token"];
  update({ contextToken });
  return { contextToken };
}

/**
 * End up the session
 */
export async function logout(): Promise<void> {
  await apiService.post(getCustomerLogoutEndpoint());
  update({ contextToken: "" });
}

/**
 * End up the session
 */
export async function getCustomer(): Promise<Customer> {
  const resp = await apiService.get(getCustomerEndpoint());
  return resp.data.data;
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

interface CustomerAddressParam extends Partial<CustomerAddress> {}

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

interface CustomerUpdateEmailParam {
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

interface CustomerUpdatePasswordParam {
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

interface CustomerUpdateProfileParam {
  firstName: string;
  lastName: string;
  salutationId: string;
  title: string;
}

/**
 * Update a customer's profile data
 */
export async function updateProfile(
  params: CustomerUpdateProfileParam
): Promise<void> {
  await apiService.patch(getCustomerEndpoint(), params);
}
