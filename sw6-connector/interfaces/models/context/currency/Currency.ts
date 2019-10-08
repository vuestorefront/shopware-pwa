import { CurrencyTranslationCollection } from "./CurrencyTranslationCollection";
import { OrderCollection } from "../../checkout/OrderCollection";
import { SalesChannelCollection } from "../../sales-channel/SalesChannelCollection";
import { SalesChannelDomainCollection } from "../../state-machine/SalesChannelDomainCollection";
import { ShippingMethodPriceCollection } from "../../price/ShippingMethodPriceCollection";
import { PromotionDiscountPriceCollection } from "../../discount/PromotionDiscountPriceCollection";

export interface CurrencyEntity {
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
