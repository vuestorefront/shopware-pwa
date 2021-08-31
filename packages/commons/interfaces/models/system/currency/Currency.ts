import { CurrencyTranslation } from "./CurrencyTranslation";
import { Order } from "../../checkout/order/Order";
import { ShippingMethodPrice } from "../../checkout/shipping/ShippingMethodPrice";
import { PromotionDiscountPrice } from "../../checkout/promotion/PromotionDiscountPrice";
import { SalesChannel } from "../sales-channel/SalesChannel";
import { SalesChannelDomain } from "../sales-channel/SalesChannelDomain";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface Currency {
  id: string;
  isoCode: string;
  factor: number;
  symbol: string;
  shortName: string | null;
  name: string | null;
  position: number;
  decimalPrecision: number;
  translations: CurrencyTranslation[] | null;
  orders: Order[] | null;
  salesChannels: SalesChannel[] | null;
  salesChannelDefaultAssignments: SalesChannel[] | null;
  salesChannelDomains: SalesChannelDomain[] | null;
  customFields: CustomField[];
  shippingMethodPrices: ShippingMethodPrice[] | null;
  promotionDiscountPrices: PromotionDiscountPrice[];
  isSystemDefault: boolean | null;
}
