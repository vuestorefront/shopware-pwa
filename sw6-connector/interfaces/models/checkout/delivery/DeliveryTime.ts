import { ShippingMethodCollection } from "../shipping/ShippingMethodCollection";
import { EntityCollection } from "../../framework/struct/EntityCollection";
export interface DeliveryTime {
    name: string | null;
    min: number;
    max: number;
    unit: string;
    shippingMethods: ShippingMethodCollection | null;
    translations: EntityCollection;
    customFields: [] | null;
}

