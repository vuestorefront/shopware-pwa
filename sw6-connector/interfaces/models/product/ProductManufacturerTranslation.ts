import { ProductManufacturerEntity } from "./ProductManufacturerEntity";
export interface ProductManufacturerTranslationEntity {
    productManufacturerId: number;
    name: string | null;
    description: string | null;
    productManufacturer: ProductManufacturerEntity | null;
    customFields: [] | null;
}
