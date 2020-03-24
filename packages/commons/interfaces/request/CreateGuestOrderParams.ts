interface BillingAddress {
  countryId: string;
  salutationId: string;
  street: string;
  zipcode: string;
  city: string;
  title?: string;
  additionalAddressLine1?: string;
  additionalAddressLine2?: string;
  phoneNumber?: string;
}

interface ShippingAddress extends BillingAddress {
  firstName: string;
  lastName: string;
}

// TODO change name
// TODO cleanup addresses
export interface CreateGuestOrderParams {
  email: string;
  salutationId: string;
  firstName: string;
  lastName: string;
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  affiliateCode?: string;
  campaignCode?: string;
  phoneNumber?: string;
}
