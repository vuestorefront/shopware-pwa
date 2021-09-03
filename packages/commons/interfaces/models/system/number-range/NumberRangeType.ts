import { NumberRange } from "./NumberRange";
import { NumberRangeSalesChannel } from "./NumberRangeSalesChannel";
import { CustomField } from "../../common/CustomField";
import { NumberRangeTypeTranslation } from "./NumberRangeTypeTranslation";

/**
 * @public
 */
export interface NumberRangeType {
  typeName: string;
  technicalName: string;
  global: boolean;
  numberRanges: NumberRange[] | null;
  numberRangeSalesChannels: NumberRangeSalesChannel | null;
  customFields: CustomField[];
  translations: NumberRangeTypeTranslation[] | null;
}
