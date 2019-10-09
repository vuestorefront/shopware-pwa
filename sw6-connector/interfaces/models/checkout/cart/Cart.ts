import { LineItemCollection } from "./line-item/LineItemCollection";
import { CartPrice } from "./price/CartPrice";
import { ErrorCollection } from "./error/ErrorCollection";
import { DeliveryCollection } from "../delivery/DeliveryCollection";
import { TransactionCollection } from "./transaction/TransactionCollection";

interface Cart { 
    name: string;
    token: string;
    price: CartPrice;
    lineItems: LineItemCollection;
    errors: ErrorCollection;
    deliveries: DeliveryCollection;
    transactions: TransactionCollection
    modified: boolean;
}


