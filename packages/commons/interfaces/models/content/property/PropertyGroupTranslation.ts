import { ShippingMethod } from "../../checkout/shipping/ShippingMethod";
import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface PropertyGroupTranslation {
  shippingMethodId: string;
  name: string | null;
  description: string | null;
  shippingMethod: ShippingMethod | null;
  customFields: CustomField[];
}
