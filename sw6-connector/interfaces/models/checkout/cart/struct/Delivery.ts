import { OrderDeliveryPositionCollection } from "../../order/OrderDeliveryPositionCollection";
import { ShippingMethodEntity } from "../../shipping/ShippingMethodEntity";
import { CalculatedPrice } from "./CalculatedPrice";
import { ShippingLocation } from "../../delivery/ShippingLocation";
import { DeliveryDate } from "../../delivery/DeliveryDate";

export interface Delivery {
    positions: OrderDeliveryPositionCollection;
    location: ShippingLocation;
    deliveryDate: DeliveryDate;
    shippingMethod: ShippingMethodEntity;
    shippingCosts: CalculatedPrice;
}
