import { MailTemplate } from "./MailTemplate";

/**
 * @alpha
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
