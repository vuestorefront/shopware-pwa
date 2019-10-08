import { LocaleEntity } from "./LocaleEntity";
export interface LocaleTranslationEntity {
    localeId: string;
    name: string | null;
    territory: string | null;
    locale: LocaleEntity | null;
    customFields: [] | null;
}
