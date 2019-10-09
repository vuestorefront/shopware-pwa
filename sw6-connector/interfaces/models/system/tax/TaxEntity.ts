import { ProductCollection } from "../../content/product/ProductCollection";
export interface TaxEntity {
    taxRate: number;
    name: string;
    products: ProductCollection;
    customFields: [] | null;
}
