import { StateMachineState } from "./StateMachineState";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface StateMachineStateTranslation {
  name: string | null;
  stateMachineStateId: string;
  stateMachineState: StateMachineState | null;
  customFields: CustomField[];
}
