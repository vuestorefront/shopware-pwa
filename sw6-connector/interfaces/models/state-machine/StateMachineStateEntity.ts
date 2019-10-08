import { OrderCollection } from '../checkout/Order';
import { StateMachineTransitionCollection } from "./StateMachineTransitionCollection";
import { StateMachineHistoryCollection } from "../stateMachine/StateMachineHistoryCollection";
import { StateMachineEntity } from "./StateMachineEntity";
import { StateMachineStateTranslationCollection } from "./StateMachineStateTranslationCollection";
import { OrderTransactionCollection, OrderDeliveryCollection } from "./ProductEntity";
export interface StateMachineStateEntity {
    name: string;
    technicalName: string;
    stateMachine: StateMachineEntity | null;
    fromStateMachineTransitions: StateMachineTransitionCollection | null;
    toStateMachineTransitions: StateMachineTransitionCollection | null;
    translations: StateMachineStateTranslationCollection;
    orders: OrderCollection | null;
    orderTransactions: OrderTransactionCollection | null;
    orderDeliveries: OrderDeliveryCollection | null;
    fromStateMachineHistoryEntries: StateMachineHistoryCollection | null;
    toStateMachineHistoryEntries: StateMachineHistoryCollection | null;
    customFields: [] | null;
}
