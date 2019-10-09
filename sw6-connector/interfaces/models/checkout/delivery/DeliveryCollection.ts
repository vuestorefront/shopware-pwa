import { Collection } from "../../framework/struct/Collection";
import { Delivery } from "./Delivery";
export interface DeliveryCollection extends Collection {
    [index: number]: Delivery;
}
