import { Country } from "./Country";
import { CountryStateTranslation } from "./CountryStateTranslation";
import { CustomerAddress } from "../../checkout/customer/CustomerAddress";
import { OrderAddress } from "../../checkout/order/OrderAddress";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface CountryState {
  countryId: string;
  shortCode: string;
  name: string | null;
  position: number;
  active: boolean;
  country: Country | null;
  translations: CountryStateTranslation[] | null;
  customerAddresses: CustomerAddress[] | null;
  orderAddresses: OrderAddress[] | null;
  customFields: CustomField[];
}
