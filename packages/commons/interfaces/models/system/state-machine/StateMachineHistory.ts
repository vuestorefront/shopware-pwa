import { StateMachineState } from "./StateMachineState";
import { StateMachine } from "./StateMachine";
import { User } from "../user/User";

/**
 * @public
 */
export interface StateMachineHistory {
  stateMachineId: string;
  stateMachine: StateMachine | null;
  entityName: string;
  entityId: [];
  fromStateId: string;
  fromStateMachineState: StateMachineState | null;
  toStateId: string;
  toStateMachineState: StateMachineState | null;
  userId: string;
  user: User | null;
}
