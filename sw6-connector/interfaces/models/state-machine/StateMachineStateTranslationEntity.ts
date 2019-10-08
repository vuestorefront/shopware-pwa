import { StateMachineStateEntity } from "../stateMachine/StateMachineStateEntity";
export interface StateMachineStateTranslationEntity {
    name: string | null;
    stateMachineStateId: string;
    stateMachineState: StateMachineStateEntity | null;
    customFields: [] | null;
}
