import { MailHeaderFooter } from "./MailHeaderFooter";
export interface MailHeaderFooterTranslation {
    name: string | null;
    description: string | null;
    headerHtml: string | null;
    headerPlain: string | null;
    footerHtml: string | null;
    footerPlain: string | null;
    mailHeaderFooter: MailHeaderFooter | null;
    mailHeaderFooterId: string;
}
