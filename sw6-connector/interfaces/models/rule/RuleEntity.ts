import { ShippingMethodCollection } from "../context/Context";
import { PaymentMethodCollection } from "../context/Context";
import { ProductPriceCollection } from "../price/ProductPriceCollection";
import { ShippingMethodPriceCollection } from "../price/ShippingMethodPriceCollection";
import { PromotionDiscountCollection } from "../discount/PromotionDiscountCollection";
import { PromotionSetGroupCollection } from "../discount/PromotionSetGroupCollection";
import { PromotionCollection } from "../discount/PromotionCollection";
import { RuleConditionCollection } from "./RuleConditionCollection";
export interface RuleEntity {
    name: string;
    description: string | null;
    payload: string | RuleEntity | null;
    moduleTypes: [] | null;
    productPrices: ProductPriceCollection;
    shippingMethods: ShippingMethodCollection;
    paymentMethods: PaymentMethodCollection;
    conditions: RuleConditionCollection;
    invalid: boolean;
    customFields: [] | null;
    shippingMethodPrices: ShippingMethodPriceCollection | null;
    promotionDiscounts: PromotionDiscountCollection | null;
    promotionSetGroups: PromotionSetGroupCollection | null;
    ShippingMethodPriceCalculations: ShippingMethodPriceCollection | null;
    personaPromotions: PromotionCollection | null;
    orderPromotions: PromotionCollection | null;
    cartPromotions: PromotionCollection | null;
}
