import { iCustomer } from "../customer/Customer";
import { Order } from "./Order";
import { Salutation } from "../../system/salutation/Salutation";
export interface OrderCustomer {
    email: string;
    orderId: string;
    salutationId: string;
    firstName: string;
    lastName: string;
    title: string | null;
    company: string | null;
    customerNumber: string | null;
    customerId: string;
    customer: iCustomer | null;
    salutation: Salutation | null;
    order: Order | null;
}
