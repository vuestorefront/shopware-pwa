import { Country } from "../../system/country/Country";
import { CountryState } from "../../system/country/CountryState";
import { CustomerAddress } from "../customer/CustomerAddress";

/**
 * @public
 */
export interface ShippingLocation {
  country: Country;
  state: CountryState;
  address: CustomerAddress;
}
