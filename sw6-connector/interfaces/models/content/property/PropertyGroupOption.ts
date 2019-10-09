import { Media } from "../media/Media";
import { PropertyGroup } from "./PropertyGroup";
import { PropertyGroupOptionTranslationCollection } from "./PropertyGroupOptionTranslationCollection";
import { ProductConfiguratorSettingCollection } from "../product/ProductConfiguratorSettingCollection";
import { ProductCollection } from "../product/ProductCollection";
export interface PropertyGroupOption {
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
