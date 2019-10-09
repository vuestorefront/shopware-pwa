import { CalculatedTaxCollection } from "../../../system/tax/CalculatedTaxCollection";
import { TaxRuleCollection } from "../../../system/tax/TaxRuleCollection";
import { ReferencePrice } from "./ReferencePrice";
export interface CalculatedPrice {
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    calculatedTaxes: CalculatedTaxCollection;
    taxRules: TaxRuleCollection;
    referencePRice: ReferencePrice;
}
