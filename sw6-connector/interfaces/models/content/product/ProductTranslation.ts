import { Product } from "./Product";
export interface ProductTranslation {
    productId: string;
    additionalText: string | null;
    name: string | null;
    keywords: string | null;
    description: string | null;
    metaTitle: string | null;
    packUnit: string | null;
    product: Product;
    customFields: [] | null;
}
