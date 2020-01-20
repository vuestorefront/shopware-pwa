import { PropertyGroupOption } from "./PropertyGroupOption";
import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface PropertyGroupOptionTranslation {
  propertyGroupOptionId: string;
  name: string | null;
  position: number | null;
  propertyGroupOption: PropertyGroupOption | null;
  customFields: CustomField[];
}
