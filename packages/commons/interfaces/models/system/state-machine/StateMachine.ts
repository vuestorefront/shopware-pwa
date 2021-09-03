import { CustomField } from "../../common/CustomField";
import { StateMachineTransition } from "./StateMachineTransition";
import { StateMachineState } from "./StateMachineState";
import { StateMachineStateTranslation } from "./StateMachineStateTranslation";
import { StateMachineHistory } from "./StateMachineHistory";

/**
 * @public
 */
export interface StateMachine {
  technicalName: string;
  name: string;
  transitions: StateMachineTransition[] | null;
  states: StateMachineState[] | null;
  initialStateId: string | null;
  translations: StateMachineStateTranslation[];
  historiEntries: StateMachineHistory[] | null;
  customFields: CustomField[];
}
