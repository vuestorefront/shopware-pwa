import { LineItem } from "./line-item/LineItem";
import { CartPrice } from "./price/CartPrice";
import { Delivery } from "../delivery/Delivery";
import { Transaction } from "./transaction/Transaction";

/**
 * @beta
 */
export interface CartError {
  id: string;
  name: string;
  quantity: number;
  message: string;
  code: number;
  key: string;
  level: number;
  messageKey:
    | "product-stock-reached"
    | "product-out-of-stock"
    | "product-not-found"
    | "purchase-steps-quantity"
    | string;
}

/**
 * @beta
 */
export interface CartErrors {
  [key: string]: CartError;
}

/**
 * @beta
 */
export interface Cart {
  name: string;
  token: string;
  price: CartPrice;
  lineItems: LineItem[];
  errors: CartErrors;
  deliveries: Delivery[];
  transactions: Transaction[];
  modified: boolean;
}
