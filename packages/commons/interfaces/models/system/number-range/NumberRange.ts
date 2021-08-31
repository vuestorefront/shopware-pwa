import { CustomField } from "../../common/CustomField";
import { NumberRangeType } from "./NumberRangeType";
import { NumberRangeSalesChannel } from "./NumberRangeSalesChannel";
import { NumberRangeState } from "./NumberRangeState";
import { NumberRangeTranslation } from "./NumberRangeTranslation";

/**
 * @public
 */
export interface NumberRange {
  typeId: string | null;
  global: boolean;
  name: string | null;
  description: string | null;
  pattern: string | null;
  start: number | null;
  type: NumberRangeType | null;
  numberRangeSalesChannels: NumberRangeSalesChannel[] | null;
  state: NumberRangeState | null;
  customFields: CustomField[];
  translations: NumberRangeTranslation[] | null;
}
