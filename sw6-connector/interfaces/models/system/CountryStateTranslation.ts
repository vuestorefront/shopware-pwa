import { iCustomField } from "../Common";
import { CountryState } from "./Country/CountryState";
export interface CountryStateTranslation {
    countryStateId: string;
    name: string | null;
    countryState: CountryState | null;
    customFields: iCustomField;
}
