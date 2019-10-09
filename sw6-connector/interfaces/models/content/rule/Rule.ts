import { ShippingMethodCollection } from "../../checkout/shipping/ShippingMethodCollection";
import { ProductPriceCollection } from "../product/ProductPriceCollection";
import { ShippingMethodPriceCollection } from "../../checkout/shipping/ShippingMethodPriceCollection";
import { PromotionDiscountCollection } from "../../checkout/promotion/PromotionDiscountCollection";
import { PromotionSetGroupCollection } from "../../checkout/promotion/PromotionSetGroupCollection";
import { PromotionCollection } from "../../checkout/promotion/PromotionCollection";
import { RuleConditionCollection } from "./RuleConditionCollection";
import { PaymentMethodCollection } from "../../checkout/payment/PaymentMethodCollection";
export interface Rule {
    name: string;
    description: string | null;
    payload: string | Rule | null;
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
