import { SnippetCollection } from "./SnippetCollection";
import { SalesChannelDomainCollection } from "../state-machine/SalesChannelDomainCollection";
export interface SnippetSetEntity {
    name: string;
    baseFile: string;
    iso: string;
    snippets: SnippetCollection | null;
    salesChannelDomains: SalesChannelDomainCollection | null;
    customFields: [] | null;
}
