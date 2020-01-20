import { SalesChannel } from "../../system/sales-channel/SalesChannel";
import { MailTemplateType } from "./MailTemplateType";

/**
 * @alpha
 */
export interface MailTemplateSalesChannel {
  mailTemplateId: string;
  salesChannelId: string | null;
  mailTemplateTypeId: string;
  mailTemplateType: MailTemplateType | null;
  mailTemplate: MailTemplateSalesChannel | null;
  salesChannel: SalesChannel | null;
}
