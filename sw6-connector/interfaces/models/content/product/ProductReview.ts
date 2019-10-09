import { Language } from "../../framework/language/Language";
import { SalesChannelEntity } from "../../system/sales-channel/SalesChannelEntity";
import { Product } from "./Product";
import { iCustomer } from "../../checkout/customer/Customer"
export interface ProductReview {
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
    language: Language | null;
    customer: iCustomer | null;
    product: Product | null;
    content: string | null;
    title: string | null;
}
