import { LocaleTranslationCollection } from "./LocaleTranslationCollection";
import { LanguageCollection } from "./LanguageCollection";
import { UserCollection } from "../user/UserCollection";
export interface LocaleEntity {
    code: string;
    name: string | null;
    territory: string | null;
    translations: LocaleTranslationCollection | null;
    users: UserCollection | null;
    languages: LanguageCollection | null;
    customFields: [] | null;
}
