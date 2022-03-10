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
 * @public
 */
export interface CartDelivery extends Delivery {
  shippingCosts: {
    unitPrice: number;
    quantity: number;
    listPrice: number | null;
    apiAlias: string;
    totalPrice: number;
  };
}

/**
 * @public
 */
export interface Cart {
  name: string;
  token: string;
  price: CartPrice;
  lineItems: LineItem[];
  errors: CartErrors;
  deliveries: CartDelivery[];
  transactions: Transaction[];
  modified: boolean;
  customerComment: null | string;
  affiliateCode: null | string;
  campaignCode: null | string;
}
