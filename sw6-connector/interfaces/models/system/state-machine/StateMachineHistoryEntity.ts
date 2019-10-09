import { StateMachineStateEntity } from "./StateMachineStateEntity";
import { StateMachineEntity } from "./StateMachineEntity";
import { UserEntity } from "../../content/media/UserEntity";
export interface StateMachineHistoryEntity {
    stateMachineId: string;
    stateMachine: StateMachineEntity | null;
    entityName: string;
    entityId: [];
    fromStateId: string;
    fromStateMachineState: StateMachineStateEntity | null;
    toStateId: string;
    toStateMachineState: StateMachineStateEntity | null;
    userId: string;
    user: UserEntity | null;
}
