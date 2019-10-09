import { iCustomField } from "../../Common";
import { NumberRangeTranslationCollection } from "./NumberRangeTranslationCollection";
import { NumberRangeSalesChannelCollection } from "./NumberRangeSalesChannelCollection";
import { NumberRangeState } from "./NumberRangeState";
import { NumberRangeType } from "./NumberRangeType";
export interface NumberRange {
    typeId: string | null;
    global: boolean;
    name: string | null;
    description: string | null;
    pattern: string | null;
    start: number | null;
    type: NumberRangeType | null;
    numberRangeSalesChannels: NumberRangeSalesChannelCollection | null;
    state: NumberRangeState | null;
    customFields: iCustomField | null;
    translations: NumberRangeTranslationCollection | null;
}
