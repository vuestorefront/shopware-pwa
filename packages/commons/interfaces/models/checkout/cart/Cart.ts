import { LineItem } from "./line-item/LineItem";
import { CartPrice } from "./price/CartPrice";
import { Error } from "./error/Error";
import { Delivery } from "../delivery/Delivery";
import { Transaction } from "./transaction/Transaction";

/**
 * @alpha
 */
export interface Cart {
  name: string;
  token: string;
  price: CartPrice;
  lineItems: LineItem[];
  errors: Error[];
  deliveries: Delivery[];
  transactions: Transaction[];
  modified: boolean;
}
