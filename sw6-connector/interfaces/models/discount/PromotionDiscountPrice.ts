import { PromotionDiscountEntity } from "./PromotionDiscountEntity";
import { CurrencyEntity } from "../context/currency/CurrencyEntity";

export interface PromotionDiscountPriceEntity {
    currencyId: string;
    discountId: string;
    price: number;
    promotionDiscount: PromotionDiscountEntity;
    currency: CurrencyEntity;
}
