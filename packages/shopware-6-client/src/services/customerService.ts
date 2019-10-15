import axios from "axios";
import { config } from "../settings";
import { CUSTOMER_ENDPOINT } from "../endpoints";
import { BillingAddress } from "../interfaces/models/checkout/customer/BillingAddress";
import { ShippingAddress } from "../interfaces/models/checkout/customer/ShippingAddress";

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
  logout: (contextToken?: string) => Promise<null>;
  register: (
    params: CustomerRegisterParam
  ) => Promise<CustomerRegisterResponse>;
}

/**
 * @description Register a customer
 */
const register = async function(
  params: CustomerRegisterParam
): Promise<CustomerRegisterResponse> {
  const resp = await axios.post(
    `${config.endpoint}${CUSTOMER_ENDPOINT}`,
    params
  );
  return resp.data;
};

/**
 * @description Get the context token for current user
 */
const login = async function(
  params: CustomerLoginParam
): Promise<CustomerLoginResponse> {
  const resp = await axios.post(
    `${config.endpoint}${CUSTOMER_ENDPOINT}/login`,
    params
  );
  return resp.data;
};

/**
 * @description End up the session
 */
const logout = async function(contextToken?: string): Promise<null> {
  const resp = await axios.post(
    `${config.endpoint}${CUSTOMER_ENDPOINT}/logout`,
    null,
    {
      headers: {
        /** TODO: move into different layer if created */
        "sw-context-token": contextToken
      }
    }
  );
  return resp.data;
};

/**
 * @description Expose public methods of the service
 */
export const CustomerService: CustomerService = {
  register,
  login,
  logout
};
