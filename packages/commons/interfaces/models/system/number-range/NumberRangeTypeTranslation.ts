import { NumberRangeType } from "./NumberRangeType";
import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface NumberRangeTypeTranslation {
  numberRangeTypeId: string;
  typeName: string | null;
  numberRangeType: NumberRangeType | null;
  customFields: CustomField[];
}
