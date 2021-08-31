import { Product } from "./Product";
import { Rule } from "../rule/Rule";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface ProductPrice {
  productId: number;
  quantityStart: number;
  quantityEnd: number | null;
  product: Product | null;
  rule: Rule | null;
  customFields: CustomField[];
}
