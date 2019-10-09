import { StateMachineStateEntity } from "./StateMachineStateEntity";

export interface StateMachineStateTranslationEntity {
    name: string | null;
    stateMachineStateId: string;
    stateMachineState: StateMachineStateEntity | null;
    customFields: [] | null;
}
