import { Media } from "../media/Media";
import { PropertyGroupOptionTranslationCollection, ProductConfiguratorSettingCollection, ProductCollection } from "./ProductEntity";
import { PropertyGroupEntity } from "../property/PropertyGroupEntity";
export interface PropertyGroupOption {
    groupId: string;
    name: string | null;
    position: number;
    colorHexCode: string | null;
    mediaId: string | null;
    group: PropertyGroupEntity | null;
    translations: PropertyGroupOptionTranslationCollection | null;
    productConfiguratorSettings: ProductConfiguratorSettingCollection | null;
    productProperties: ProductCollection | null;
    productOptions: ProductCollection | null;
    media: Media | null;
    customFields: [] | null;
}
