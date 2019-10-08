import { StateMachineStateEntity } from "../stateMachine/StateMachineStateEntity";
export interface StateMachineTransitionEntity {
    actionName: string;
    stateMachineId: string;
    stateMachine: StateMachineStateEntity | null;
    fromStateId: string;
    fromStateMachineState: StateMachineStateEntity | null;
    toStateId: string;
    toStateMachineState: StateMachineStateEntity | null;
    customFields: [] | null;
}
