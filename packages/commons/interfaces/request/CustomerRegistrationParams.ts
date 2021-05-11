import { ShippingAddress } from "../models/checkout/customer/ShippingAddress";
import { BillingAddress } from "../models/checkout/customer/BillingAddress";

/**
 *
 * docs: https://shopware.stoplight.io/docs/store-api/storeapi.json/paths/~1account~1register/post
 *
 * @beta
 */
export interface CustomerRegistrationParams {
  salutationId: string;
  firstName: string;
  lastName: string;
  /**
   * Password for the customer. Required, unless `guest` is `true`
   */
  password?: string;
  /**
   * If set, will create a guest customer. Guest customers can re-use an email address and don't need a password.
   */
  guest?: boolean;
  email: string;
  title?: string;
  birthdayYear?: number;
  birthdayMonth?: number;
  birthdayDay?: number;
  billingAddress: Partial<BillingAddress> /** TODO: replace Partial with correct optional fields in BillingAddress */;
  shippingAddress?: ShippingAddress;
  /**
   * storefrontUrl - should be one of the domains that are assigned to the corresponding sales channel (admin panel)
   */
  storefrontUrl?: string;
}
