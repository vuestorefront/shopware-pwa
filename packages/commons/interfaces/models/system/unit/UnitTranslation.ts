import { Unit } from "./Unit";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface UnitTranslation {
  unitId: string;
  shortCode: string | null;
  name: string | null;
  unit: Unit | null;
  customFields: CustomField[];
}
