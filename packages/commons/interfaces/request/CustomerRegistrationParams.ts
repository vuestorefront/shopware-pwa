import { ShippingAddress } from "../models/checkout/customer/ShippingAddress";
import { BillingAddress } from "../models/checkout/customer/BillingAddress";

/**
 * @alpha
 */
export interface CustomerRegistrationParams {
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
