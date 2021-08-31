import { CalculatedPrice } from "../cart/price/CalculatedPrice";
import { PriceDefinitionInterface } from "../cart/price/PriceDefinitionInterface";
import { Order } from "./Order";
import { OrderDeliveryPosition } from "./OrderDeliveryPosition";
import { Media } from "../../content/media/Media";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface OrderLineItem {
  orderId: string;
  identifier: string;
  referenceId: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  label: string;
  description: string | null;
  good: boolean;
  removable: boolean;
  coverId: string | null;
  stackable: boolean;
  price: CalculatedPrice | null;
  priceDefiniton: PriceDefinitionInterface | null;
  payload: string[] | null;
  parentId: string | null;
  type: string | null;
  order: Order | null;
  orderDeliveryPosition: OrderDeliveryPosition[] | null;
  customFields: CustomField[];
  cover: Media | null;
  children: OrderLineItem[] | null;
}
