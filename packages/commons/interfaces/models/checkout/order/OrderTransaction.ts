import { Order } from "./Order";
import { PaymentMethod } from "../payment/PaymentMethod";
import { StateMachineState } from "../../system/state-machine/StateMachineState";
import { CalculatedPrice } from "../cart/price/CalculatedPrice";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface OrderTransaction {
  orderId: string;
  paymentMethodId: string;
  amount: CalculatedPrice;
  paymentMethod: PaymentMethod | null;
  order: Order | null;
  stateMachineState: StateMachineState | null;
  stateId: string;
  customFields: CustomField[];
}
