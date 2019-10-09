import { NumberRange } from "./NumberRange";
export interface NumberRangeState {
    numberRangeId: string;
    lastValue: number;
    numberRange: NumberRange | null;
}
