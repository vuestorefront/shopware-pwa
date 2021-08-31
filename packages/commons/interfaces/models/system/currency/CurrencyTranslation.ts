import { Currency } from "./Currency";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface CurrencyTranslation {
  currencyId: string;
  shortName: string | null;
  name: string | null;
  currency: Currency | null;
  customFields: CustomField[];
}
