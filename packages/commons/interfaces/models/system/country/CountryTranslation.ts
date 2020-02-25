import { Country } from "./Country";
import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface CountryTranslation {
  countryId: string;
  name: string | null;
  country: Country | null;
  customFields: CustomField[];
}
