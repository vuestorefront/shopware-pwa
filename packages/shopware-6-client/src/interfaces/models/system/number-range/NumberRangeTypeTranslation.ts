import { NumberRangeType } from "./NumberRangeType";
import { CustomField } from "../../common/CustomField";
export interface NumberRangeTypeTranslation {
  numberRangeTypeId: string;
  typeName: string | null;
  numberRangeType: NumberRangeType | null;
  customFields: CustomField[];
}
