import { ProductManufacturer } from "./ProductManufacturer";

export interface ProductManufacturerTranslation {
    productManufacturerId: number;
    name: string | null;
    description: string | null;
    productManufacturer: ProductManufacturer | null;
    customFields: [] | null;
}
