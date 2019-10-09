import { LocaleTranslationCollection } from "./LocaleTranslationCollection";
import { LanguageCollection } from "../../framework/language/LanguageCollection";
import { UserCollection } from "../user/UserCollection";
export interface Locale {
    code: string;
    name: string | null;
    territory: string | null;
    translations: LocaleTranslationCollection | null;
    users: UserCollection | null;
    languages: LanguageCollection | null;
    customFields: [] | null;
}
