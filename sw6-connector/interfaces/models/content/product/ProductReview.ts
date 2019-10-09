import { SalesChannelEntity } from "../../system/sales-channel/SalesChannelEntity";
import { Language } from "../../framework/language/Language";
import { Product } from "./Product";
import { Customer } from "../../checkout/customer/Customer";

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
    customer: Customer | null;
    product: Product | null;
    content: string | null;
    title: string | null;
}
