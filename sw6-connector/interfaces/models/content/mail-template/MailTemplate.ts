import { MailTemplateMediaCollection } from "../media/MailTemplateMediaCollection";
import { MailTemplateSalesChannelCollection } from "./MailTemplateSalesChannelCollection";
import { MailTemplateType } from "./MailTemplateType";
import { MailTemplateTranslationCollection } from "./MailTemplateTranslationCollection";
export interface MailTemplate {
    mailTemplateTypeId: string | null;
    mailTemplateType: MailTemplateType | null;
    systemDefault: boolean;
    senderName: string | null;
    description: string | null;
    subject: string | null;
    contentHtml: string | null;
    contentPlain: string | null;
    salesChannels: MailTemplateSalesChannelCollection | null;
    translations: MailTemplateTranslationCollection | null;
    media: MailTemplateMediaCollection | null;
}
