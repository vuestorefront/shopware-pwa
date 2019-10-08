import { LanguageEntity } from "../context/LanguageEntity";
import { SalesChannelEntity } from "../sales-channel/SalesChannelEntity";
import { Product } from "./ProductEntity";
import { iCustomer } from "../customer/Customer"
export interface ProductReviewEntity {
    productId: string;
    customerId: string;
    salesChannelId: string;
    languageId: string;
    externalUser: string | null;
    externalEmail: string | null;
    points: number | null;
    status: boolean;
    comment: string | null;
    salesChannel: SalesChannelEntity | null;
    language: LanguageEntity | null;
    customer: iCustomer | null;
    product: Product | null;
    content: string | null;
    title: string | null;
}
