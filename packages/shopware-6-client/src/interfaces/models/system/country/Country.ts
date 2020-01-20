import { CountryState } from "./CountryState";
import { CountryTranslation } from "./CountryTranslation";
import { OrderAddress } from "../../checkout/order/OrderAddress";
import { CustomerAddress } from "../../checkout/customer/CustomerAddress";
import { SalesChannel } from "../sales-channel/SalesChannel";

/**
 * @alpha
 */
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
  states: CountryState[] | null;
  translations: CountryTranslation[] | null;
  orderAddresses: OrderAddress[] | null;
  customerAddress: CustomerAddress[] | null;
  salesChannelDefaultAssignments: SalesChannel[] | null;
  salesChannels: SalesChannel[] | null;
}
