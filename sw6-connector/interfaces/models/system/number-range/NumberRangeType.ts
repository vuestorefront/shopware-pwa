import { iCustomField } from "../../Common";
import { NumberRangeCollection } from "./NumberRangeCollection";
import { NumberRangeSalesChannel } from "./NumberRangeSalesChannel";
import { NumberRangeTypeTranslationCollection } from "./NumberRangeTypeTranslationCollection";
export interface NumberRangeType {
    typeName: string;
    technicalName: string;
    global: boolean;
    numberRanges: NumberRangeCollection | null;
    numberRangeSalesChannels: NumberRangeSalesChannel | null;
    customFields: iCustomField | null;
    translations: NumberRangeTypeTranslationCollection | null;
}
