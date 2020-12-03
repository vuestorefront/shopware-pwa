import { BillingAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/BillingAddress";

export interface ShippingAddress extends BillingAddress {
  firstName: string;
  lastName: string;
}

export interface GuestOrderParams {
  email: string;
  salutationId: string;
  firstName: string;
  lastName: string;
  billingAddress: Partial<BillingAddress>;
  shippingAddress?: ShippingAddress;
  affiliateCode?: string;
  campaignCode?: string;
  phoneNumber?: string;
}
