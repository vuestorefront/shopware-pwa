import { ShippingMethod } from "../shipping/ShippingMethod";
import { Entity } from "../../common/Entity";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface DeliveryTime {
  name: string | null;
  min: number;
  max: number;
  unit: string;
  shippingMethods: ShippingMethod[] | null;
  translations: Entity[];
  customFields: CustomField[];
}
