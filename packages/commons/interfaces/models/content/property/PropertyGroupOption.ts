import { Media } from "../media/Media";
import { PropertyGroup } from "./PropertyGroup";
import { PropertyGroupOptionTranslation } from "./PropertyGroupOptionTranslation";
import { ProductConfiguratorSetting } from "../product/ProductConfiguratorSetting";
import { Product } from "../product/Product";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface PropertyGroupOption {
  id: string;
  groupId: string;
  name: string | null;
  position: number;
  colorHexCode: string | null;
  mediaId: string | null;
  group: PropertyGroup | null;
  translations: PropertyGroupOptionTranslation[] | null;
  productConfiguratorSettings: ProductConfiguratorSetting[] | null;
  productProperties: Product[] | null;
  productOptions: Product[] | null;
  media: Media | null;
  customFields: CustomField[];
  translated: {
    [key: string]: any;
  };
}
