import { iCustomField } from "../../Common";
import { MailTemplateTypeCollection } from "./MailTemplateTypeCollection";
import { MailTemplateSalesChannelCollection } from "./MailTemplateSalesChannelCollection";
import { MailTemplateTypeTranslationCollection } from "./MailTemplateTypeTranslationCollection";
export interface MailTemplateType {
    name: string;
    technicalName: string;
    availableEntities: [] | null;
    translations: MailTemplateTypeTranslationCollection | null;
    mailTemplates: MailTemplateTypeCollection | null;
    customFields: iCustomField | null;
    salesChannels: MailTemplateSalesChannelCollection | null;
    createdAt: Date;
    updatedAt: Date;
}
