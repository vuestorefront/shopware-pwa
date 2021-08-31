import { ProductStream } from "./ProductStream";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface ProductStreamFilter {
  type: string;
  field: string | null;
  operator: string | null;
  value: string | null;
  productStreamId: string;
  parentId: string | null;
  productStream: ProductStream | null;
  queries: ProductStreamFilter[] | null;
  parent: ProductStreamFilter | null;
  position: number;
  parameters: [] | null;
  customFields: CustomField[];
}
