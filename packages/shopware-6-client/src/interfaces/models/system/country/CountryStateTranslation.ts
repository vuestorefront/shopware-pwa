import { CountryState } from "./CountryState";
import { CustomField } from "../../common/CustomField";
export interface CountryStateTranslation {
  countryStateId: string;
  name: string | null;
  countryState: CountryState | null;
  customFields: CustomField[];
}
