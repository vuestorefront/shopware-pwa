import { PaymentMethodEntity } from "./PaymentMethodEntity";

export interface PaymentMethodCollection { 
    [index: number]: PaymentMethodEntity;
}