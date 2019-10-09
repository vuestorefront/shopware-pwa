import { Language } from "../../framework/language/Language";
import { SalesChannelEntity } from "./SalesChannelEntity";
import { SnippetSetEntity } from "../../framework/snippet/SnippetSetEntity";
import { Currency } from "../currency/Currency";
export interface SalesChannelDomainEntity {
    url: string;
    currencyId: string | null;
    currency: Currency | null;
    snippetSetId: string | null;
    snippetSet: SnippetSetEntity | null;
    salesChannelId: string;
    salesChannel: SalesChannelEntity | null;
    languageId: string;
    language: Language | null;
    customFields: [] | null;
}
