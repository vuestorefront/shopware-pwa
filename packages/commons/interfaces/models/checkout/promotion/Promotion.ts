import { TaxRule } from "../../system/tax/TaxRule";
import { PromotionSalesChannel } from "./PromotionSalesChannel";
import { PromotionIndividualCode } from "./PromotionIndividualCode";
import { PromotionSetGroup } from "./PromotionSetGroup";
import { PromotionDiscount } from "./PromotionDiscount";
import { Rule } from "../../content/rule/Rule";
import { PromotionTranslation } from "./PromotionTranslation";
import { Customer } from "../customer/Customer";

/**
 * @public
 */
export interface Promotion {
  name: string | null;
  active: boolean;
  validFrom: Date;
  validUntil: Date;
  maxRedemptionsGlobal: number;
  maxRedemptionsPerCustomer: number;
  exclusive: boolean;
  useCodes: boolean;
  useSetGroups: boolean;
  customerRestriction: boolean;
  useIndividualCodes: boolean;
  individualCodePattern: string;
  salesChannels: PromotionSalesChannel[] | null;
  code: string | null;
  discounts: PromotionDiscount[] | null;
  individualCodes: PromotionIndividualCode[] | null;
  setgroups: PromotionSetGroup[] | null;
  orderRules: Rule[] | null;
  personaRules: Rule[] | null;
  personaCustomers: Customer[] | null;
  cartRules: TaxRule[];
  translations: PromotionTranslation[] | null;
  orderCount: number;
  ordersPerCustomerCount: [] | null;
  exclusionIds: string[];
}
