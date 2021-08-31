import { StateMachineState } from "./StateMachineState";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface StateMachineTransition {
  actionName: string;
  stateMachineId: string;
  stateMachine: StateMachineState | null;
  fromStateId: string;
  fromStateMachineState: StateMachineState | null;
  toStateId: string;
  toStateMachineState: StateMachineState | null;
  customFields: CustomField[];
}
