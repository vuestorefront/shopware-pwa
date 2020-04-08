import { PaymentMethod } from "../models/checkout/payment/PaymentMethod";
import { ShippingMethod } from "../models/checkout/shipping/ShippingMethod";
import { Country } from "../models/system/country/Country";
import { User } from "../models/system/user/User";

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
  currency: {
    id: string;
    name: string;
  };
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
    country: Country;
  };
}
