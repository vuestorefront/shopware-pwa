import { SalesChannelEntity } from "../../system/sales-channel/SalesChannelEntity";
import { MailTemplateType } from "./MailTemplateType";
export interface MailTemplateSalesChannel {
    mailTemplateId: string;
    salesChannelId: string | null;
    mailTemplateTypeId: string;
    mailTemplateType: MailTemplateType | null;
    mailTemplate: MailTemplateSalesChannel | null;
    salesChannel: SalesChannelEntity | null;
}
