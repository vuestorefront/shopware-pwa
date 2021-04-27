import { LineItem } from "./line-item/LineItem";
import { CartPrice } from "./price/CartPrice";
import { Delivery } from "../delivery/Delivery";
import { Transaction } from "./transaction/Transaction";
import { EntityError } from "../../common/EntityError";

/**
 * @beta
 */
export interface CartErrors {
  [key: string]: EntityError;
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
  customerComment: null | string;
  affiliateCode: null | string;
  campaignCode: null | string;
}
