import { MailTemplateType } from "./MailTemplateType";

/**
 * @public
 */
export interface MailTemplateTypeTranslation {
  mailTemplateTypeId: string;
  mailTemplateType: MailTemplateType | null;
  name: string | null;
}
