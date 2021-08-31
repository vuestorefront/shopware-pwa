import { MailTemplateSalesChannel } from "./MailTemplateSalesChannel";
import { MailTemplateTypeTranslation } from "./MailTemplateTypeTranslation";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface MailTemplateType {
  name: string;
  technicalName: string;
  availableEntities: [] | null;
  translations: MailTemplateTypeTranslation[] | null;
  mailTemplates: MailTemplateType[] | null;
  customFields: CustomField[];
  salesChannels: MailTemplateSalesChannel[] | null;
  createdAt: Date;
  updatedAt: Date;
}
