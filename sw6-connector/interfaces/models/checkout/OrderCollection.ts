import { OrderEntity } from "./Order";
export interface OrderCollection {
    [index: number]: OrderEntity;
}
