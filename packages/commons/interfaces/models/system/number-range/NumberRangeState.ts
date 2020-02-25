import { NumberRange } from "./NumberRange";

/**
 * @alpha
 */
export interface NumberRangeState {
  numberRangeId: string;
  lastValue: number;
  numberRange: NumberRange | null;
}
