import { SalesChannelCollection } from "../sales-channel/SalesChannelCollection";
import { CountryStateCollection } from "./CountryStateCollection";
import { OrderAddressCollection } from "../../checkout/order/OrderAddressCollection";
import { CountryTranslationCollection } from "./CountryTranslationCollection";
import { CustomerAddressCollection } from "../../checkout/customer/CustomerAddressCollection";
export interface Country {
    name: string | null;
    iso: string | null;
    position: number;
    taxFree: boolean;
    active: boolean;
    shippingAvailable: boolean;
    iso3: string | null;
    displayStateInRegistration: boolean;
    forceStateInRegistration: boolean;
    states: CountryStateCollection | null;
    translations: CountryTranslationCollection | null;
    orderAddresses: OrderAddressCollection | null;
    customerAddress: CustomerAddressCollection | null;
    salesChannelDefaultAssignments: SalesChannelCollection | null;
    salesChannels: SalesChannelCollection | null;
}


