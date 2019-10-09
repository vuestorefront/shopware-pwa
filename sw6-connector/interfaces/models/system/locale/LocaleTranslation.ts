import { Locale } from "./Locale";
export interface LocaleTranslation {
    localeId: string;
    name: string | null;
    territory: string | null;
    locale: Locale | null;
    customFields: [] | null;
}
