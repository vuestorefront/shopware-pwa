import { ProductStreamTranslation } from "./ProductStreamTranslation";
import { ProductStreamFilter } from "./ProductStreamFilter";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface ProductStream {
  name: string;
  description: string | null;
  apiFilter: [] | null;
  filters: ProductStreamFilter[] | null;
  invalid: boolean;
  translations: ProductStreamTranslation[] | null;
  customFields: CustomField[];
}
