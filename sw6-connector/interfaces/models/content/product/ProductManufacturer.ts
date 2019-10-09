import { ProductCollection } from "./ProductCollection";
import { ProductManufacturerTranslationCollection } from "./ProductManufacturerTranslationCollection";
export interface ProductManufacturer {
    mediaId: string | null;
    name: string | null;
    link: string | null;
    description: string | null;
    translations: ProductManufacturerTranslationCollection | null;
    products: ProductCollection;
    customFields: [] | null;
}