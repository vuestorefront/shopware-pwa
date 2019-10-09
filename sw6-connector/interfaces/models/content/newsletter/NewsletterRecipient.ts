import { Language } from "../../framework/language/Language";
import { SalesChannelEntity } from "../../system/sales-channel/SalesChannelEntity";
import { iCustomField } from "../../Common";
import { TagCollection } from "../../system/tag/Tag";
import { Salutation } from "../../system/salutation/Salutation";
export interface NewsletterRecipient {
    email: string;
    title: string | null;
    firstName: string | null;
    lastName: string | null;
    zipCode: string | null;
    city: string | null;
    street: string | null;
    status: string | null;
    hash: string;
    salutationId: string | null;
    salutation: Salutation | null;
    languageId: string;
    language: Language | null;
    salesChannelId: string;
    salesChannel: SalesChannelEntity | null;
    customFields: iCustomField | null;
    confirmedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    tags: TagCollection | null;
}
