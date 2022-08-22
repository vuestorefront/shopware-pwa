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
  getCustomerAddAddressEndpoint,
  getConfirmPasswordResetEndpoint,
  getCustomerAccountConfirmEndpoint,
  getCustomerUpdatePaymentMethodEndpoint,
  getNewsletterRecipientEnpoint,
} from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";
import {
  Customer,
  CustomerAddress,
  CustomerRegistrationParams,
  ContextTokenResponse,
  Order,
  EntityResult,
  ShopwareSearchParams,
} from "@shopware-pwa/commons";

/**
 * @public
 */
export interface CustomerRegisterResponse {
  data: string;
}

/**
 * Register a customer
 *
 * @throws ClientApiError
 * @public
 */
export async function register(
  params: CustomerRegistrationParams,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Customer> {
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
 * @public
 */
export async function login(
  { username, password }: { username?: string; password?: string } = {},
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<ContextTokenResponse> {
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
 * @public
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
 * @public
 */
export async function getCustomer(
  parameters: ShopwareSearchParams = {},
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Customer | null> {
  try {
    const resp = await contextInstance.invoke.post(
      getCustomerEndpoint(),
      parameters
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
 * @public
 */
export async function getCustomerAddresses(
  parameters: ShopwareSearchParams = {},
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<EntityResult<"customer_address", CustomerAddress[]>> {
  const resp = await contextInstance.invoke.post(
    getCustomerAddressEndpoint(),
    parameters
  );
  return resp.data;
}

/**
 * Get all customer's orders
 *
 * @throws ClientApiError
 * @public
 */
export async function getCustomerOrders(
  parameters: ShopwareSearchParams = {},
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<EntityResult<"order", Order[]>> {
  const resp = await contextInstance.invoke.post(
    getCustomerOrderEndpoint(),
    parameters
  );
  return resp.data.orders;
}

/**
 * Get the customer's address by id
 *
 * @throws ClientApiError
 * @public
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
 * @public
 */
export async function createCustomerAddress(
  params: Partial<CustomerAddress>,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<CustomerAddress> {
  const resp = await contextInstance.invoke.post(
    getCustomerAddAddressEndpoint(),
    params
  );
  return resp.data;
}

/**
 * Update an address for specific ID
 *
 * @throws ClientApiError
 * @public
 */
export async function updateCustomerAddress(
  params: Partial<CustomerAddress>,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<CustomerAddress> {
  const resp = await contextInstance.invoke.patch(
    getCustomerAddressEndpoint(params.id),
    params
  );
  return resp.data;
}

/**
 * Delete's the customer's address by id
 *
 * @throws ClientApiError
 * @public
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
 * @public
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
 * @public
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
 * @public
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
 * @public
 */
export async function updateEmail(
  params: CustomerUpdateEmailParam,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(getCustomerUpdateEmailEndpoint(), params);
}

/**
 * @public
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
 * @public
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
 * @public
 */
export interface CustomerResetPasswordParam {
  email: string;
  storefrontUrl?: string;
}

/**
 * Reset a customer's password
 *
 * @throws ClientApiError
 * @public
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
 * Confirm a customer's password reset. Set new password for account.
 *
 * @throws ClientApiError
 * @public
 */
export async function confirmPasswordReset(
  params: {
    newPassword: string;
    hash: string;
    [key: string]: unknown; // additional params
  },
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  if (!params) return;
  await contextInstance.invoke.post(getConfirmPasswordResetEndpoint(), {
    newPasswordConfirm: params.newPassword,
    ...params,
  });
}

/**
 * @public
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
 * @public
 */
export async function updateProfile(
  params: CustomerUpdateProfileParam,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(getCustomerDetailsUpdateEndpoint(), params);
}

/**
 * Confirm an account registration in double opt-in mode
 * @throws ClientApiError
 * @public
 */
export async function confirmAccountRegistration(
  params: {
    hash: string;
    em: string;
  },
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<Customer> {
  const response = await contextInstance.invoke.post(
    getCustomerAccountConfirmEndpoint(),
    params
  );
  return response.data;
}

/**
 * Set payment method under provided ID as default
 *
 * @throws ClientApiError
 * @public
 */
export async function setDefaultCustomerPaymentMethod(
  paymentMethodId: string,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<{
  success: boolean;
}> {
  const response = await contextInstance.invoke.post(
    getCustomerUpdatePaymentMethodEndpoint(paymentMethodId)
  );
  return response.data;
}

export async function isUserSubscribingNewsletter(
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<boolean> {
  const response = await contextInstance.invoke.post(
    getNewsletterRecipientEnpoint()
  );
  return response.data.status === "undefined" ? false : true;
}
