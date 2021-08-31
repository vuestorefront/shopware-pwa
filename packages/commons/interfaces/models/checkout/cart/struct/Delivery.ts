import { OrderDeliveryPosition } from "../../order/OrderDeliveryPosition";
import { ShippingMethod } from "../../shipping/ShippingMethod";
import { CalculatedPrice } from "./CalculatedPrice";
import { ShippingLocation } from "../../delivery/ShippingLocation";
import { DeliveryDate } from "../../delivery/DeliveryDate";

/**
 * @public
 */
export interface Delivery {
  positions: OrderDeliveryPosition[];
  location: ShippingLocation;
  deliveryDate: DeliveryDate;
  shippingMethod: ShippingMethod;
  shippingCosts: CalculatedPrice;
}
