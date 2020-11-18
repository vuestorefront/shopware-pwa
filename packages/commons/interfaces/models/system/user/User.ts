import { ShippingAddress } from "../../checkout/customer/ShippingAddress";
import { BillingAddress } from "../../checkout/customer/BillingAddress";
export interface User {
  activeBillingAddress?: BillingAddress;
  activeShippingAddress?: ShippingAddress;
}
