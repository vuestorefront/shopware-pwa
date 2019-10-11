import { CalculatedTax } from "../../../system/tax/CalculatedTax";
import { TaxRule } from "../../../system/tax/TaxRule";
export interface CartPrice {
  netPrice: number;
  totalPrice: number;
  calculatedTaxes: CalculatedTax[];
  taxRules: TaxRule[];
  positionPrice: number;
  taxStatus: string;
}
