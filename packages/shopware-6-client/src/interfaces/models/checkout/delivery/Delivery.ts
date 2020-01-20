import { OrderDeliveryPosition } from "../order/OrderDeliveryPosition";
import { ShippingMethod } from "../shipping/ShippingMethod";
import { CalculatedPrice } from "../cart/price/CalculatedPrice";
import { ShippingLocation } from "./ShippingLocation";
import { DeliveryDate } from "./DeliveryDate";

/**
 * @alpha
 */
export interface Delivery {
  positions: OrderDeliveryPosition[];
  location: ShippingLocation;
  deliveryDate: DeliveryDate;
  shippingMethod: ShippingMethod;
  shippingCosts: CalculatedPrice;
}
