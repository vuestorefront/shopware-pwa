import { ShippingMethodCollection } from "../context/Context";
import { EntityCollection } from "../EntityCollection";
export interface DeliveryTimeEntity {
    name: string | null;
    min: number;
    max: number;
    unit: string;
    shippingMethods: ShippingMethodCollection | null;
    translations: EntityCollection;
    customFields: [] | null;
}
