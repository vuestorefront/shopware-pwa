import {
  getCustomerEndpoint,
  getCustomerAddressEndpoint,
  getCustomerUpdateEmailEndpoint,
  getCustomerUpdatePasswordEndpoint,
  getCustomerDefaultBillingAddressEndpoint,
  getCustomerDefaultShippingAddressEndpoint
} from "../endpoints";
import { BillingAddress } from "../interfaces/models/checkout/customer/BillingAddress";
import { ShippingAddress } from "../interfaces/models/checkout/customer/ShippingAddress";
import { Customer } from "../interfaces/models/checkout/customer/Customer";
import { apiService } from "../apiService";
import { CustomerAddress } from "../interfaces/models/checkout/customer/CustomerAddress";

interface CustomerLoginParam {
  username: string;
  password: string;
}

interface CustomerRegisterParam {
  salutationId: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  title?: string;
  birthdayYear?: number;
  birthdayMonth?: number;
  birthdayDay?: number;
  billingAddress: Partial<
    BillingAddress
  > /** TODO: replace Partial with correct optional fields in BillingAddress */;
  shippingAddress?: ShippingAddress;
}

interface CustomerUpdateEmailParam {
  email: string;
  emailConfirmation: string;
  password: string;
}

interface CustomerUpdatePasswordParam {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface CustomerUpdateProfileParam {
  firstName: string;
  lastName: string;
  salutationId: string;
  title: string;
}

interface CustomerAddressParam extends Partial<CustomerAddress> {}

interface CustomerLoginResponse {
  "sw-context-token": string;
}

interface CustomerRegisterResponse {
  data: string;
}

/**
 * Usage example:
 * ```ts
 * import { CustomerService } from '@shopware-pwa/shopware-6-client'
 * ```
 */
export interface CustomerService {
  login: (params: CustomerLoginParam) => Promise<CustomerLoginResponse>;
  logout: (contextToken: string) => Promise<null>;
  register: (
    params: CustomerRegisterParam
  ) => Promise<CustomerRegisterResponse>;
  getCustomer: (contextToken: string) => Promise<Customer> | Promise<never>;
  getCustomerAddresses: (contextToken?: string) => Promise<CustomerAddress[]>;
  getCustomerAddress: (
    addressId: string,
    contextToken?: string
  ) => Promise<CustomerAddress>;
  createCustomerAddress: (
    params: CustomerAddressParam,
    contextToken?: string
  ) => Promise<string>;
  updateEmail: (params: CustomerUpdateEmailParam) => Promise<null>;
  updatePassword: (params: CustomerUpdatePasswordParam) => Promise<null>;
  updateProfile: (params: CustomerUpdateProfileParam) => Promise<null>;
}

/**
 * @description Register a customer
 */
export const register = async function(
  params: CustomerRegisterParam
): Promise<CustomerRegisterResponse> {
  const resp = await apiService.post(getCustomerEndpoint(), params);
  return resp.data;
};

/**
 * @description Get the context token for current user
 */
export const login = async function(
  params: CustomerLoginParam
): Promise<CustomerLoginResponse> {
  const resp = await apiService.post(`${getCustomerEndpoint()}/login`, params);
  return resp.data;
};

/**
 * @description End up the session
 */
export const logout = async function(contextToken?: string): Promise<null> {
  const resp = await apiService.post(`${getCustomerEndpoint()}/logout`, null, {
    headers: {
      /** TODO: move into different layer if created */
      "sw-context-token": contextToken
    }
  });
  return resp.data;
};

/**
 * @description End up the session
 */
export const getCustomer = async function(
  contextToken: string
): Promise<Customer> {
  const resp = await apiService.get(getCustomerEndpoint(), {
    headers: {
      /** TODO: move into different layer if created */
      "sw-context-token": contextToken
    }
  });
  return resp.data.data;
};

/**
 * @description Get all customer's addresses
 */
export const getCustomerAddresses = async function(
  contextToken: string
): Promise<CustomerAddress[]> {
  const resp = await apiService.get(getCustomerAddressEndpoint(), {
    headers: {
      /** TODO: move into different layer if created */
      "sw-context-token": contextToken
    }
  });
  return resp.data.data;
};

/**
 * @description Get the customer's address by id
 */
export const getCustomerAddress = async function(
  addressId: string,
  contextToken?: string
): Promise<CustomerAddress> {
  const resp = await apiService.get(getCustomerAddressEndpoint(addressId), {
    headers: {
      /** TODO: move into different layer if created */
      "sw-context-token": contextToken
    }
  });
  return resp.data.data;
};

/**
 * @description Get the customer's address by id
 */
export const createCustomerAddress = async function(
  params: CustomerAddressParam,
  contextToken?: string
): Promise<string> {
  const resp = await apiService.post(getCustomerAddressEndpoint(), params, {
    headers: {
      /** TODO: move into different layer if created */
      "sw-context-token": contextToken
    }
  });
  return resp.data;
};

/**
 * @description Delete's the customer's address by id
 */
export const deleteCustomerAddress = async function(
  addressId: string,
  contextToken?: string
): Promise<null> {
  await apiService.delete(getCustomerAddressEndpoint(addressId), {
    headers: {
      /** TODO: move into different layer if created */
      "sw-context-token": contextToken
    }
  });
  return null;
};

/**
 * @description Set address as default
 */
export const setDefaultCustomerBillingAddress = async function(
  addressId: string,
  contextToken?: string
): Promise<string> {
  const response = await apiService.patch(
    getCustomerDefaultBillingAddressEndpoint(addressId),
    {
      headers: {
        /** TODO: move into different layer if created */
        "sw-context-token": contextToken
      }
    }
  );
  return response.data;
};

/**
 * @description Set address as default
 */
export const setDefaultCustomerShippingAddress = async function(
  addressId: string,
  contextToken?: string
): Promise<string> {
  const response = await apiService.patch(
    getCustomerDefaultShippingAddressEndpoint(addressId),
    {
      headers: {
        /** TODO: move into different layer if created */
        "sw-context-token": contextToken
      }
    }
  );
  return response.data;
};

/**
 * @description Update a customer's email
 */
export const updateEmail = async function(
  params: CustomerUpdateEmailParam
): Promise<null> {
  await apiService.patch(getCustomerUpdateEmailEndpoint(), params);
  return null;
};

/**
 * @description Update a customer's password
 */
export const updatePassword = async function(
  params: CustomerUpdatePasswordParam
): Promise<null> {
  await apiService.patch(getCustomerUpdatePasswordEndpoint(), params);
  return null;
};

/**
 * @description Update a customer's profile data
 */
export const updateProfile = async function(
  params: CustomerUpdateProfileParam
): Promise<null> {
  await apiService.patch(getCustomerEndpoint(), params);
  return null;
};

/**
 * @description Expose public methods of the service
 */
export const CustomerService: CustomerService = {
  register,
  login,
  logout,
  getCustomer,
  getCustomerAddresses,
  getCustomerAddress,
  createCustomerAddress,
  updateEmail,
  updatePassword,
  updateProfile
};
