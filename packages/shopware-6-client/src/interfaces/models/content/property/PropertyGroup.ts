import { PropertyGroupOption } from "./PropertyGroupOption";
import { CustomField } from "../../common/CustomField";
import { PropertyGroupOptionTranslation } from "./PropertyGroupOptionTranslation";
export interface PropertyGroup {
  name: string | null;
  displayType: string;
  sortingType: string;
  description: string | null;
  options: PropertyGroupOption[] | null;
  translations: PropertyGroupOptionTranslation[] | null;
  customFields: CustomField[];
}
