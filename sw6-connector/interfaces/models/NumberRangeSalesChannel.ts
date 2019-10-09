import { SalesChannelEntity } from "./system/sales-channel/SalesChannelEntity";
import { NumberRange } from "./system/number-range/NumberRange";
import { NumberRangeType } from "./NumberRangeType";
export interface NumberRangeSalesChannel {
    numberRangeId: string;
    salesChannelId: string;
    numberRange: NumberRange | null;
    salesChannel: SalesChannelEntity | null;
    numberRangeType: NumberRangeType | null;
}
