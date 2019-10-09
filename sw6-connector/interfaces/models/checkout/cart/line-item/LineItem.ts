import { CalculatedPrice } from "../price/CalculatedPrice";
import { Media } from "../../../content/media/Media";
import { Rule } from "../../../framework/rule/Rule";
import { DeliveryInformation } from "../../delivery/DeliveryInformation";
import { PriceDefinitionInterface } from "../price/PriceDefinitionInterface";
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
    cover: Media | null;
    deliveryInformation: DeliveryInformation | null;
    children: LineItemCollection;
    requirement: Rule | null;
    removable: boolean;
    stackable: boolean;
    quantityInformation: QuantityInformation | null;
    modified: boolean;
}
