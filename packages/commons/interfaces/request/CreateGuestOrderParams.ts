interface BillingAddress {
  countryId: string;
  salutationId: string;
  street: string;
  zipcode: string;
  city: string;
  title?: string | null | undefined;
  additionalAddressLine1?: string;
  additionalAddressLine2?: string;
  phoneNumber?: string | null | undefined;
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
  shippingAddress?: ShippingAddress | null | undefined;
  affiliateCode?: string;
  campaignCode?: string;
  phoneNumber?: string;
}
