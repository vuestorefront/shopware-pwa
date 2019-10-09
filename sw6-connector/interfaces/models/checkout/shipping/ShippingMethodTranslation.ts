import { iCustomField } from "../../Common";
import { ShippingMethodEntity } from "./ShippingMethodEntity";
export interface ShippingMethodTranslation {
    shippingMethodId: string;
    name: string | null;
    description: string | null;
    shippingMethod: ShippingMethodEntity | null;
    customFields: iCustomField | null;
}
