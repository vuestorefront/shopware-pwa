import { CalculatedTax } from "../../../system/tax/CalculatedTax";
import { TaxRule } from "../../../system/tax/TaxRule";
import { ReferencePrice } from "./ReferencePrice";
export interface CalculatedPrice {
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  calculatedTaxes: CalculatedTax[];
  taxRules: TaxRule[];
  referencePrice: ReferencePrice;
}
