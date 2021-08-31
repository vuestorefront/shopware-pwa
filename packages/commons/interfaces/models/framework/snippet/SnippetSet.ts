import { CustomField } from "../../common/CustomField";
import { SalesChannelDomain } from "../../system/sales-channel/SalesChannelDomain";
import { Snippet } from "./Snippet";

/**
 * @public
 */
export interface SnippetSet {
  name: string;
  baseFile: string;
  iso: string;
  snippets: Snippet[] | null;
  salesChannelDomains: SalesChannelDomain[] | null;
  customFields: CustomField | null;
}
