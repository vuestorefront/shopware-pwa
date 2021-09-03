import { Order } from "./Order";
import { ShippingMethodPrice } from "../shipping/ShippingMethodPrice";
import { StateMachineState } from "../../system/state-machine/StateMachineState";
import { CalculatedPrice } from "../cart/price/CalculatedPrice";
import { OrderAddress } from "./OrderAddress";
import { OrderDeliveryPosition } from "./OrderDeliveryPosition";

/**
 * @public
 */
export interface OrderDelivery {
  orderId: string;
  shippingOrderAddressId: string;
  shippingMethodId: string;
  trackingCode: string | null;
  shippingDateEarliest: Date;
  shippingDateLatest: Date;
  shippingCosts: CalculatedPrice;
  shippingOrderAddress: OrderAddress | null;
  stateId: string;
  stateMachineState: StateMachineState | null;
  shippingMethod: ShippingMethodPrice | null;
  order: Order | null;
  positions: OrderDeliveryPosition[] | null;
}
