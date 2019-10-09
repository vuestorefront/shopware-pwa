import { SalesChannelEntity } from "../sales-channel/SalesChannelEntity";
import { NumberRange } from "./NumberRange";
import { NumberRangeType } from "./NumberRangeType";
export interface NumberRangeSalesChannel {
    numberRangeId: string;
    salesChannelId: string;
    numberRange: NumberRange | null;
    salesChannel: SalesChannelEntity | null;
    numberRangeType: NumberRangeType | null;
}
