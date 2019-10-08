import { LineItemCollection } from "./LineItemCollection";
import { CartPrice } from "./CartPrice";
import { CartErrorCollection } from "./CartErrorCollection";
import { DeliveryCollection } from "./DeliveryCollection";
import { TransactionCollection } from "./TransactionCollection";

interface Cart { 
    name: string;
    token: string;
    price: CartPrice;
    lineItems: LineItemCollection;
    errors: CartErrorCollection;
    deliveries: DeliveryCollection;
    transactions: TransactionCollection
    modified: boolean;
}


