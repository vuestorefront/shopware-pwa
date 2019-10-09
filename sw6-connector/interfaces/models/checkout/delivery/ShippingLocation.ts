import { Country } from "../../system/country/Country";
import { CountryState } from "../../system/country/CountryState";
import { iCustomerAddress } from "../customer/Address";
export interface ShippingLocation {
    country: Country;
    state: CountryState;
    address: iCustomerAddress;
}
