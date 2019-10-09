import { iCustomField } from "../../Common";
import { Country } from "./Country";
import { OrderAddress } from "../../checkout/order/OrderAddress";
import { CustomerAddressCollection } from "../../checkout/customer/CustomerAddressCollection";
import { CountryStateTranslationCollection } from "./CountryStateTranslationCollection";
export interface CountryState {
    countryId: string;
    shortCode: string;
    name: string | null;
    position: number;
    active: boolean;
    country: Country | null;
    translations: CountryStateTranslationCollection | null;
    customerAddresses: CustomerAddressCollection | null;
    orderAddressCollection: OrderAddress | null;
    customFields: iCustomField;
}
