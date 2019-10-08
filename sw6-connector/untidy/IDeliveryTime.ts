import { IShippingMethodCollection } from "./IContext";
import { IProductCollection } from "./IProduct";
import { IEntityCollection } from "./IEntity";

export interface IDeliveryTimeEntity {
    name: string|null;
    min: number;
    max: number;
    unit: string;
    shippingMethods: IShippingMethodCollection|null;
    translations: IEntityCollection;
    customFields: []|null;
    products: IProductCollection|null;
}