import { iCustomField } from "../../Common";
import { ShippingMethodEntity } from "../../checkout/shipping/ShippingMethodEntity";
export interface PropertyGroupTranslation {
    shippingMethodId: string;
    name: string | null;
    description: string | null;
    shippingMethod: ShippingMethodEntity | null;
    customFields: iCustomField | null;
}
