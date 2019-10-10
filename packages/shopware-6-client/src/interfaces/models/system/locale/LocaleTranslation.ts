import { Locale } from "./Locale";
import { CustomField } from "../../common/CustomField";
export interface LocaleTranslation {
  localeId: string;
  name: string | null;
  territory: string | null;
  locale: Locale | null;
  customFields: CustomField | null;
}
