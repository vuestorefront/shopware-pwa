import { CalculatedPrice } from "../price/CalculatedPrice";
import { MediaEntity } from "../media/MediaEntity";
import { Rule } from "../rule/Rule";
import { DeliveryInformation } from "./DeliveryInformation";
import { PriceDefinitionInterface } from "./PriceDefinitionInterface";
import { QuantityInformation } from "./QuantityInformation";
import { LineItemCollection } from "./LineItemCollection";
export interface LineItem {
    id: string;
    referencedId: string | null;
    label: string | null;
    quantity: number;
    type: string;
    payload: [];
    priceDefinition: PriceDefinitionInterface | null;
    price: CalculatedPrice | null;
    good: boolean;
    description: string | null;
    cover: MediaEntity | null;
    deliveryInformation: DeliveryInformation | null;
    children: LineItemCollection;
    requirement: Rule | null;
    removable: boolean;
    stackable: boolean;
    quantityInformation: QuantityInformation | null;
    modified: boolean;
}
