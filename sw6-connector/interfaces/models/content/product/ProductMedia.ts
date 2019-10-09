import { Media } from "../media/Media";
import { Product } from "./Product";
export interface ProductMedia {
    productId: string;
    mediaId: string;
    position: number;
    media: Media;
    product: Product;
    customFields: [] | null;
}
