import { StateMachine } from "./StateMachine";
import { Order } from "../../checkout/order/Order";
import { OrderTransaction } from "../../checkout/order/OrderTransaction";
import { OrderDelivery } from "../../checkout/order/OrderDelivery";
import { StateMachineTransition } from "./StateMachineTransition";
import { StateMachineHistory } from "./StateMachineHistory";
import { StateMachineStateTranslation } from "./StateMachineStateTranslation";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface StateMachineState {
  name: string;
  technicalName: string;
  stateMachine: StateMachine | null;
  fromStateMachineTransitions: StateMachineTransition[] | null;
  toStateMachineTransitions: StateMachineTransition[] | null;
  translations: StateMachineStateTranslation[];
  orders: Order[] | null;
  orderTransactions: OrderTransaction[] | null;
  orderDeliveries: OrderDelivery[] | null;
  fromStateMachineHistoryEntries: StateMachineHistory[] | null;
  toStateMachineHistoryEntries: StateMachineHistory[] | null;
  customFields: CustomField[];
}
