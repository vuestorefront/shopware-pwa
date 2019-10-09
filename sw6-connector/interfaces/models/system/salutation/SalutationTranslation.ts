import { ShippingMethodEntity } from "../../checkout/shipping/ShippingMethodEntity";
export interface SalutationTranslation {
    shippingMethodId: string;
    name: string | null;
    description: string | null;
    shippingMethod: ShippingMethodEntity | null;
}
