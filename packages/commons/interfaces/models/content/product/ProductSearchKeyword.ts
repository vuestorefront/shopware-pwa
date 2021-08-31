import { Product } from "./Product";
import { Language } from "../../framework/language/Language";

/**
 * @public
 */
export interface ProductSearchKeyword {
  languageId: string;
  productId: string;
  keyword: string;
  ranking: number;
  product: Product | null;
  language: Language | null;
}
