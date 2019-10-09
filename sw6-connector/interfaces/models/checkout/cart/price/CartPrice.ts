import { CalculatedTaxCollection } from "../../../system/tax/CalculatedTaxCollection";
import { TaxRuleCollection } from "../../../system/tax/TaxRuleCollection";
export interface CartPrice {
    netPrice: number;
    totalPrice: number;
    calculatedTaxes: CalculatedTaxCollection;
    taxRules: TaxRuleCollection;
    positionPrice: number;
    taxStatus: string;
}
