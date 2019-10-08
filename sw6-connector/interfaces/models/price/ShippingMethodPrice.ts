import { CurrencyEntity } from "../context/CurrencyEntity";
import { RuleEntity } from "../rule/RuleEntity";
export interface ShippingMethodPriceEntity {
    shippingMethodId: string;
    currencyId: string;
    calculation: number | null;
    quantityStart: number | null;
    quantityEnd: number | null;
    price: number;
    shippingMethod: ShippingMethodPriceEntity | null;
    customFields: [] | null;
    rule: RuleEntity | null;
    currency: CurrencyEntity | null;
    calculationRuleId: string | null;
}
