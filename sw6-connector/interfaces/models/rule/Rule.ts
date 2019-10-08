import { ShippingMethodCollection } from "../context/Context";
import { PaymentMethodCollection } from "../context/Context";
import { ProductPriceCollection } from "../price/ProductPriceCollection";
import { Rule } from "./Rule";
import { RuleConditionCollection } from "./RuleConditionCollection";
import { PromotionCollection } from "../discount/PromotionCollection";
import { PromotionSetGroupCollection } from "../discount/PromotionSetGroupCollection";
import { PromotionDiscountCollection } from "../discount/PromotionDiscountCollection";
import { ShippingMethodPriceCollection } from "../price/ShippingMethodPriceCollection";
export interface RuleCollection {
    name: string;
    description: string | null;
    priority: number;
    payload: string | Rule | null;
    moduleTypes: [] | null;
    productPrices: ProductPriceCollection | null;
    shippingMethods: ShippingMethodCollection | null;
    paymentMethods: PaymentMethodCollection | null;
    conditions: RuleConditionCollection | null;
    invalid: boolean;
    customFields: [] | null;
    shippingMethodPrices: ShippingMethodPriceCollection | null;
    promotionDiscounts: PromotionDiscountCollection | null;
    promotionSetGroups: PromotionSetGroupCollection | null;
    shippingMethodPriceCalculations: ShippingMethodPriceCollection | null;
    personaPromotions: PromotionCollection | null;
    orderPromotions: PromotionCollection | null;
    cartPromotions: PromotionCollection | null;
}
