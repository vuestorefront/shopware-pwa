import { ProductStream } from "./ProductStream";
import { CustomField } from "../../common/CustomField";
export interface ProductStreamTranslation {
  productStreamId: string;
  name: string | null;
  description: string | null;
  productStream: ProductStream | null;
  customFields: CustomField;
}
