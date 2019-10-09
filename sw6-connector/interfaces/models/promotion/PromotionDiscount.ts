import { RuleCollection } from "../../content/rule/RuleCollection";
import { Promotion } from "./Promotion";
export interface PromotionDiscount {
    promotionId: string;
    scope: string;
    type: string;
    value: number;
    promotion: Promotion | null;
    discountRules: RuleCollection | null;
    considerAdvancedRules: boolean;
    maxValue: number | null;
    promotionDiscountPrices: number | null;
}
