import { Media } from "../media/Media";
import { PropertyGroupOptionEntity } from "../property/PropertyGroupOptionEntity";
import { Product } from "./Product";
export interface ProductConfiguratorSetting {
    productId: number;
    optionId: number;
    mediaId: number;
    position: number;
    price: [] | null;
    option: PropertyGroupOptionEntity | null;
    media: Media | null;
    selected: boolean;
    product: Product | null;
    customFields: [] | null;
}
