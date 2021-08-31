import { NumberRange } from "./NumberRange";

/**
 * @public
 */
export interface NumberRangeState {
  numberRangeId: string;
  lastValue: number;
  numberRange: NumberRange | null;
}
