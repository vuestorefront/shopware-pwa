import { Product } from "./Product";
import { ProductManufacturerTranslation } from "./ProductManufacturerTranslation";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface ProductManufacturer {
  mediaId: string | null;
  name: string | null;
  link: string | null;
  description: string | null;
  translations: ProductManufacturerTranslation[] | null;
  products: Product[];
  customFields: CustomField[];
}
