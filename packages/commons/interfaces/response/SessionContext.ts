import { PaymentMethod } from "../models/checkout/payment/PaymentMethod";
import { ShippingMethod } from "../models/checkout/shipping/ShippingMethod";
import { ShippingAddress } from "../models/checkout/customer/ShippingAddress";
import { Country } from "../models/system/country/Country";
import { User } from "../models/system/user/User";
import { Currency } from "../models/system/currency/Currency";

export interface ContextTokenResponse {
  contextToken: string;
}

export interface SessionContext {
  token: string;
  currentCustomerGroup: {
    id: string;
    name: string;
  };
  fallbackCustomerGroup: {
    id: string;
    name: string;
  };
  currency: Currency;
  salesChannel: {
    id: string;
    name: string;
  };
  taxRules: {
    id: string;
    name: string;
  }[];
  customer?: User;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  shippingLocation: {
    address: ShippingAddress;
    country: Country;
  };
}
