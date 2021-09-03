import { MailTemplateMedia } from "./MailTemplateMedia";
import { MailTemplateSalesChannel } from "./MailTemplateSalesChannel";
import { MailTemplateType } from "./MailTemplateType";
import { MailTemplateTranslation } from "./MailTemplateTranslation";

/**
 * @public
 */
export interface MailTemplate {
  mailTemplateTypeId: string | null;
  mailTemplateType: MailTemplateType | null;
  systemDefault: boolean;
  senderName: string | null;
  description: string | null;
  subject: string | null;
  contentHtml: string | null;
  contentPlain: string | null;
  salesChannels: MailTemplateSalesChannel[] | null;
  translations: MailTemplateTranslation[] | null;
  media: MailTemplateMedia[] | null;
}
