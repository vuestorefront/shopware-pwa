import { NumberRange } from "./NumberRange";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface NumberRangeTranslation {
  numberRangeId: string;
  name: string | null;
  description: string | null;
  numberRange: NumberRange | null;
  customFields: CustomField[];
}
