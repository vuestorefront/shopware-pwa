import { MailHeaderFooterTranslation } from "./MailHeaderFooterTranslation";
import { SalesChannel } from "../../system/sales-channel/SalesChannel";

/**
 * @alpha
 */
export interface MailHeaderFooter {
  name: string | null;
  systemDefault: boolean;
  description: string | null;
  headerHtml: string | null;
  headerPlain: string | null;
  footerHtml: string | null;
  footerPlain: string | null;
  salesChannels: SalesChannel[] | null;
  translations: MailHeaderFooterTranslation[] | null;
}
