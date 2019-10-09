import { MailTemplateType } from "./MailTemplateType";
export interface MailTemplateTypeTranslation {
    mailTemplateTypeId: string;
    mailTemplateType: MailTemplateType | null;
    name: string | null;
}
