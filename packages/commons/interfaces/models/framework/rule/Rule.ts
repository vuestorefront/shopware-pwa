import { ProductPrice } from "../../content/product/ProductPrice";
import { PaymentMethod } from "../../checkout/payment/PaymentMethod";
import { ShippingMethodPrice } from "../../checkout/shipping/ShippingMethodPrice";
import { PromotionDiscount } from "../../checkout/promotion/PromotionDiscount";
import { PromotionSetGroup } from "../../checkout/promotion/PromotionSetGroup";
import { Promotion } from "../../checkout/promotion/Promotion";
import { ShippingMethod } from "../../checkout/shipping/ShippingMethod";
import { RuleCondition } from "../../content/rule/RuleCondition";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface Rule {
  name: string;
  description: string | null;
  priority: number;
  payload: string | Rule | null;
  moduleTypes: [] | null;
  productPrices: ProductPrice[] | null;
  shippingMethods: ShippingMethod[] | null;
  paymentMethods: PaymentMethod[] | null;
  conditions: RuleCondition[] | null;
  invalid: boolean;
  customFields: CustomField[];
  shippingMethodPrices: ShippingMethodPrice[] | null;
  promotionDiscounts: PromotionDiscount[] | null;
  promotionSetGroups: PromotionSetGroup[] | null;
  shippingMethodPriceCalculations: ShippingMethodPrice[] | null;
  personaPromotions: Promotion[] | null;
  orderPromotions: Promotion[] | null;
  cartPromotions: Promotion[] | null;
}
