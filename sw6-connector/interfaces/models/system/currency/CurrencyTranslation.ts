import { Currency } from "./Currency";
export interface CurrencyTranslation {
    currencyId: string;
    shortName: string | null;
    name: string | null;
    currency: Currency | null;
    customFields: [] | null;
}
