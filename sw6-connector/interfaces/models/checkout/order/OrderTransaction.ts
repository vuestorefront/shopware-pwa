import { Order } from './Order';
import { PaymentMethod } from "../payment/PaymentMethod";
import { StateMachineStateEntity } from "../../system/state-machine/StateMachineStateEntity";
import { CalculatedPrice } from "../cart/price/CalculatedPrice";
export interface OrderTransaction {
    orderId: string;
    paymentMethodId: string;
    amount: CalculatedPrice;
    paymentMethod: PaymentMethod | null;
    order: Order | null;
    stateMachineState: StateMachineStateEntity | null;
    stateId: string;
    customFields: [] | null;
}
