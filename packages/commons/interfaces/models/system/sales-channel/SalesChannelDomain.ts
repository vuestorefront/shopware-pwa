import { Language } from "../../framework/language/Language";
import { SalesChannel } from "./SalesChannel";
import { SnippetSet } from "../../framework/snippet/SnippetSet";
import { Currency } from "../currency/Currency";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface SalesChannelDomain {
  url: string;
  currencyId: string | null;
  currency: Currency | null;
  snippetSetId: string | null;
  snippetSet: SnippetSet | null;
  salesChannelId: string;
  salesChannel: SalesChannel | null;
  languageId: string;
  language: Language | null;
  customFields: CustomField[];
}
