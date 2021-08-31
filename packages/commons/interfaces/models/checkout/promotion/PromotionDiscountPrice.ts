import { PromotionDiscount } from "./PromotionDiscount";
import { Currency } from "../../system/currency/Currency";

/**
 * @public
 */
export interface PromotionDiscountPrice {
  currencyId: string;
  discountId: string;
  price: number;
  promotionDiscount: PromotionDiscount;
  currency: Currency;
}
