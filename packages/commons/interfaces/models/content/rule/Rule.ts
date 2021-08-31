import { ShippingMethod } from "../../checkout/shipping/ShippingMethod";
import { ProductPrice } from "../product/ProductPrice";
import { ShippingMethodPrice } from "../../checkout/shipping/ShippingMethodPrice";
import { PromotionDiscount } from "../../checkout/promotion/PromotionDiscount";
import { PromotionSetGroup } from "../../checkout/promotion/PromotionSetGroup";
import { Promotion } from "../../checkout/promotion/Promotion";
import { RuleCondition } from "./RuleCondition";
import { PaymentMethod } from "../../checkout/payment/PaymentMethod";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface Rule {
  name: string;
  description: string | null;
  payload: string | Rule | null;
  moduleTypes: [] | null;
  productPrices: ProductPrice[];
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
  conditions: RuleCondition[];
  invalid: boolean;
  customFields: CustomField[];
  shippingMethodPrices: ShippingMethodPrice[] | null;
  promotionDiscounts: PromotionDiscount[] | null;
  promotionSetGroups: PromotionSetGroup[] | null;
  ShippingMethodPriceCalculations: ShippingMethodPrice[] | null;
  personaPromotions: Promotion[] | null;
  orderPromotions: Promotion[] | null;
  cartPromotions: Promotion[] | null;
}
