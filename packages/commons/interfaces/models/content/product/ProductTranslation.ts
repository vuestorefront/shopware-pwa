import { Product } from "./Product";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface ProductTranslation {
  productId: string;
  additionalText: string | null;
  name: string | null;
  keywords: string | null;
  description: string | null;
  metaTitle: string | null;
  packUnit: string | null;
  product: Product;
  customFields: CustomField | null;
}
