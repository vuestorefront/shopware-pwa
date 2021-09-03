import { NumberRangeType } from "./NumberRangeType";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface NumberRangeTypeTranslation {
  numberRangeTypeId: string;
  typeName: string | null;
  numberRangeType: NumberRangeType | null;
  customFields: CustomField[];
}
