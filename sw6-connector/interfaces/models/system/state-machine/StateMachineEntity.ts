import { StateMachineTransitionCollection } from "./StateMachineTransitionCollection";
import { StateMachineStateCollection } from "./StateMachineStateCollection";
import { StateMachineTranslationCollection } from "./StateMachineTranslationCollection";
import { StateMachineHistoryCollection } from "./StateMachineHistoryCollection";
export interface StateMachineEntity {
    technicalName: string;
    name: string;
    transitions: StateMachineTransitionCollection | null;
    states: StateMachineStateCollection | null;
    initialStateId: string | null;
    translations: StateMachineTranslationCollection;
    historiEntries: StateMachineHistoryCollection | null;
    customFields: [] | null;
}
