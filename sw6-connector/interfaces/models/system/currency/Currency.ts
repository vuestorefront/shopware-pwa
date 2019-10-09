import { CurrencyTranslationCollection } from "./CurrencyTranslationCollection";
import { OrderCollection } from "../../checkout/order/OrderCollection";
import { SalesChannelCollection } from "../sales-channel/SalesChannelCollection";
import { SalesChannelDomainCollection } from "../sales-channel/SalesChannelDomainCollection";
import { ShippingMethodPriceCollection } from "../../checkout/shipping/ShippingMethodPriceCollection";
import { PromotionDiscountPriceCollection } from "../../checkout/promotion/PromotionDiscountPriceCollection";

export interface Currency {
    isoCode: string;
    factor: number;
    symbol: string;
    shortName: string | null;
    name: string | null;
    position: number;
    decimalPrecision: number;
    translations: CurrencyTranslationCollection | null;
    orders: OrderCollection | null;
    salesChannels: SalesChannelCollection | null;
    salesChannelDefaultAssignments: SalesChannelCollection | null;
    salesChannelDomains: SalesChannelDomainCollection | null;
    customFields: [] | null;
    shippingMethodPrices: ShippingMethodPriceCollection | null;
    promotionDiscountPrices: PromotionDiscountPriceCollection;
    isSystemDefault: boolean | null;
}
