import { iCustomField } from "../../Common";
import { NumberRangeType } from "./NumberRangeType";
interface NumberRangeTypeTranslation {
    numberRangeTypeId: string;
    typeName: string | null;
    numberRangeType: NumberRangeType | null;
    customFields: iCustomField | null;
}
