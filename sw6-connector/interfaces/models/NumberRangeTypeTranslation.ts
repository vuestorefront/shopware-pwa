import { iCustomField } from "./Common";
import { NumberRangeType } from "./system/number-range/NumberRangeType";
interface NumberRangeTypeTranslation {
    numberRangeTypeId: string;
    typeName: string | null;
    numberRangeType: NumberRangeType | null;
    customFields: iCustomField | null;
}
