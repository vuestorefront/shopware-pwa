import { MailTemplateType } from "./MailTemplateType";

/**
 * @alpha
 */
export interface MailTemplateTypeTranslation {
  mailTemplateTypeId: string;
  mailTemplateType: MailTemplateType | null;
  name: string | null;
}
