import { ShippingMethodCollection } from "../../checkout/shipping/ShippingMethodCollection";
import { ProductPriceCollection } from "../../content/product/ProductPriceCollection";
import { RuleConditionCollection } from "../../content/rule/RuleConditionCollection";
import { PromotionCollection } from "../../checkout/promotion/PromotionCollection";
import { PromotionSetGroupCollection } from "../../checkout/promotion/PromotionSetGroupCollection";
import { PromotionDiscountCollection } from "../../checkout/promotion/PromotionDiscountCollection";
import { ShippingMethodPriceCollection } from "../../checkout/shipping/ShippingMethodPriceCollection";
import { PaymentMethodCollection } from "../../checkout/payment/PaymentMethodCollection";
export interface Rule {
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
