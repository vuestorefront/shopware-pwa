import { DeliveryTime } from "./DeliveryTime";
export interface DeliveryInformation {
    stock: number;
    weight: number;
    freeDelivery: boolean;
    restockTime: number | null;
    deliveryTime: DeliveryTime | null;
}
