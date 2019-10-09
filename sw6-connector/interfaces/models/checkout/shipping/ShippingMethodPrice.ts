import { Rule } from "../../content/rule/Rule";
import { Currency } from "../../system/currency/Currency";
export interface ShippingMethodPrice {
    shippingMethodId: string;
    currencyId: string;
    calculation: number | null;
    quantityStart: number | null;
    quantityEnd: number | null;
    price: number;
    shippingMethod: ShippingMethodPrice | null;
    customFields: [] | null;
    rule: Rule | null;
    currency: Currency | null;
    calculationRuleId: string | null;
}
