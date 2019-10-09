import { OrderDeliveryPositionCollection } from "../order/OrderDeliveryPositionCollection";
import { ShippingMethodEntity } from "../shipping/ShippingMethodEntity";
import { CalculatedPrice } from "../cart/price/CalculatedPrice";
import { ShippingLocation } from "./ShippingLocation";
import { DeliveryDate } from "./DeliveryDate";

export interface Delivery {
    positions: OrderDeliveryPositionCollection;
    location: ShippingLocation;
    deliveryDate: DeliveryDate;
    shippingMethod: ShippingMethodEntity;
    shippingCosts: CalculatedPrice;
}
