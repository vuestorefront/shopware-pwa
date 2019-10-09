import { SalesChannelCollection } from "../../system/sales-channel/SalesChannelCollection";
import { MailHeaderFooterTranslationCollection } from "./MailHeaderFooterTranslationCollection";
export interface MailHeaderFooter {
    name: string | null;
    systemDefault: boolean;
    description: string | null;
    headerHtml: string | null;
    headerPlain: string | null;
    footerHtml: string | null;
    footerPlain: string | null;
    salesChannels: SalesChannelCollection | null;
    translations: MailHeaderFooterTranslationCollection | null;
}

