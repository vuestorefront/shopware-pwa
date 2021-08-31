import { MailTemplate } from "./MailTemplate";

/**
 * @public
 */
export interface MailTemplateTranslation {
  mailTemplateId: string;
  senderName: string | null;
  description: string | null;
  subject: string | null;
  contentHtml: string | null;
  contentPlain: string | null;
  mailTemplate: MailTemplate | null;
}
