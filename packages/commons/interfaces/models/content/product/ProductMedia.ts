import { Media } from "../media/Media";
import { Product } from "./Product";
import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface ProductMedia {
  productId: string;
  mediaId: string;
  position: number;
  media: Media;
  product: Product;
  customFields: CustomField[];
  url: string;
}
