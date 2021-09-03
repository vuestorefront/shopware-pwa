import { Product } from "../../content/product/Product";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface Tax {
  taxRate: number;
  name: string;
  products: Product[] | null;
  customFields: CustomField[];
}
