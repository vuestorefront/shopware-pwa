import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";
import { CustomField } from "@shopware-pwa/commons/interfaces/models/common/CustomField";

/**
 * @public
 */
export type AddressType = "billing" | "shipping";

/**
 * @public
 */
export interface CustomerAddress {
  customerId?: string;
  countryId: string;
  countryStateId?: string | null;
  salutationId: string;
  firstName: string;
  lastName: string;
  zipcode: string;
  city: string;
  company?: string | null;
  department?: string | null;
  title?: string | null;
  street: string;
  vatId?: string | null;
  phoneNumber?: string | null;
  additionalAddressLine1?: string;
  additionalAddressLine2?: string;
  country?: Country;
  countryState?: string;
  salutation: string | null;
  customer?: string;
  customFields?: CustomField;
  id?: string;
}
