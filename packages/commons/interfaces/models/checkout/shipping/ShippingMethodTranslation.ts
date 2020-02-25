import { ShippingMethod } from "./ShippingMethod";
import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface ShippingMethodTranslation {
  shippingMethodId: string;
  name: string | null;
  description: string | null;
  shippingMethod: ShippingMethod | null;
  customFields: CustomField[];
}
