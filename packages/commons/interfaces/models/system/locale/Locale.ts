import { LocaleTranslation } from "./LocaleTranslation";
import { User } from "../user/User";
import { Language } from "../../framework/language/Language";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface Locale {
  code: string;
  name: string | null;
  territory: string | null;
  translations: LocaleTranslation[] | null;
  users: User[] | null;
  languages: Language[] | null;
  customFields: CustomField | null;
}
