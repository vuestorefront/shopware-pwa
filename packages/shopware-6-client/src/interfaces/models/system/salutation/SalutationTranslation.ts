import { ShippingMethod } from "../../checkout/shipping/ShippingMethod";
export interface SalutationTranslation {
  shippingMethodId: string;
  name: string | null;
  description: string | null;
  shippingMethod: ShippingMethod | null;
}
