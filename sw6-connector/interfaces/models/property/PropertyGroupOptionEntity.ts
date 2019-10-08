import { MediaEntity } from "../media/MediaEntity";
import { ProductConfiguratorSettingCollection } from "../product/ProductConfiguratorSettingCollection";
import { PropertyGroupOptionTranslationCollection } from "./PropertyGroupOptionTranslationCollection";
import { ProductCollection } from "../product/ProductCollection";
import { PropertyGroupEntity } from "./PropertyGroupEntity";
export interface PropertyGroupOptionEntity {
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
    media: MediaEntity | null;
    customFields: [] | null;
}
