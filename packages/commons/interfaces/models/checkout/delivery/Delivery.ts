import { OrderDeliveryPosition } from "../order/OrderDeliveryPosition";
import { ShippingMethod } from "../shipping/ShippingMethod";
import { CalculatedPrice } from "../cart/price/CalculatedPrice";
import { ShippingLocation } from "./ShippingLocation";
import { DeliveryDate } from "./DeliveryDate";
import { StateMachineState } from "../../system/state-machine/StateMachineState";

/**
 * @public
 */
export interface Delivery {
  shippingMethodId: string;
  stateMachineState: StateMachineState;
  positions: OrderDeliveryPosition[];
  location: ShippingLocation;
  deliveryDate: DeliveryDate;
  shippingMethod: ShippingMethod;
  shippingCosts: CalculatedPrice;
}
