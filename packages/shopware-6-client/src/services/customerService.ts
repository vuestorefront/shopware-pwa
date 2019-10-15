import axios from "axios";
import { config } from "../settings";
import { CUSTOMER_ENDPOINT } from "../endpoints";

interface CustomerLoginParam {
  username: string;
  password: string;
}

interface CustomerLoginResponse {
  "sw-context-token": string;
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
}

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
  login,
  logout
};
