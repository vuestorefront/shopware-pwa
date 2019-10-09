import { iCustomField } from "../../Common";
import { Country } from "./Country";
export interface CountryTranslation {
    countryId: string;
    name: string | null;
    country: Country | null;
    customFields: iCustomField | null;
}
