import { LanguageEntity } from "../context/language/LanguageEntity";
import { SalesChannelEntity } from "../sales-channel/SalesChannelEntity";
import { SnippetSetEntity } from "../snippet/SnippetSetEntity";
import { CurrencyEntity } from "../context/currency/CurrencyEntity";
export interface SalesChannelDomainEntity {
    url: string;
    currencyId: string | null;
    currency: CurrencyEntity | null;
    snippetSetId: string | null;
    snippetSet: SnippetSetEntity | null;
    salesChannelId: string;
    salesChannel: SalesChannelEntity | null;
    languageId: string;
    language: LanguageEntity | null;
    customFields: [] | null;
}
