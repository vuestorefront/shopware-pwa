import { ShippingMethod } from "../../checkout/shipping/ShippingMethod";

/**
 * @public
 */
export interface SalutationTranslation {
  shippingMethodId: string;
  name: string | null;
  description: string | null;
  shippingMethod: ShippingMethod | null;
}
