import { MediaEntity } from "../media/MediaEntity";
import { PropertyGroupOptionEntity } from "../property/PropertyGroupOptionEntity";
import { ProductEntity } from "./ProductEntity";
export interface ProductConfiguratorSettingEntity {
    productId: number;
    optionId: number;
    mediaId: number;
    position: number;
    price: [] | null;
    option: PropertyGroupOptionEntity | null;
    media: MediaEntity | null;
    selected: boolean;
    product: ProductEntity | null;
    customFields: [] | null;
}
