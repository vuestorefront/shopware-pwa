import { Product } from "./Product";
import { Rule } from "../rule/Rule";
export interface ProductPrice {
    productId: number;
    quantityStart: number;
    quantityEnd: number | null;
    product: Product | null;
    rule: Rule | null;
    customFields: [] | null;
}
