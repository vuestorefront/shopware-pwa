import { ProductEntity } from "./ProductEntity";
export interface ProductTranslationEntity {
    productId: string;
    additionalText: string | null;
    name: string | null;
    keywords: string | null;
    description: string | null;
    metaTitle: string | null;
    packUnit: string | null;
    product: ProductEntity;
    customFields: [] | null;
}
