import { StateMachineEntity } from "./StateMachineEntity";
import { StateMachineTransitionCollection } from "./StateMachineTransitionCollection";
import { StateMachineStateTranslationCollection } from "./StateMachineStateTranslationCollection";
import { OrderCollection } from "../../checkout/order/OrderCollection";
import { OrderDeliveryCollection } from "../../checkout/order/OrderDeliveryCollection";
import { StateMachineHistoryCollection } from "./StateMachineHistoryCollection";
import { OrderTransactionCollection } from "../../checkout/order/OrderTransactionCollection";

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
