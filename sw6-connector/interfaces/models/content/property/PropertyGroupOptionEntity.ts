import { Media } from "../media/Media";
import { ProductConfiguratorSettingCollection } from "../product/ProductConfiguratorSettingCollection";
import { PropertyGroupOptionTranslationCollection } from "./PropertyGroupOptionTranslationCollection";
import { ProductCollection } from "../product/ProductCollection";
import { PropertyGroup } from "./PropertyGroup";
export interface PropertyGroupOptionEntity {
    groupId: string;
    name: string | null;
    position: number;
    colorHexCode: string | null;
    mediaId: string | null;
    group: PropertyGroup | null;
    translations: PropertyGroupOptionTranslationCollection | null;
    productConfiguratorSettings: ProductConfiguratorSettingCollection | null;
    productProperties: ProductCollection | null;
    productOptions: ProductCollection | null;
    media: Media | null;
    customFields: [] | null;
}
