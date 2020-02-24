import { UnitTranslation } from "./UnitTranslation";
import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface Unit {
  shortCode: string | null;
  name: string | null;
  translations: UnitTranslation[] | null;
  customFields: CustomField[];
}
