import { CurrencyEntity } from "./CurrencyEntity";
export interface CurrencyTranslationEntity {
    currencyId: string;
    shortName: string | null;
    name: string | null;
    currency: CurrencyEntity | null;
    customFields: [] | null;
}
