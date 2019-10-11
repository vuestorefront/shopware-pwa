import { CustomField } from "../../common/CustomField";

export interface DocumentTypeTranslation {
  documentTypeId: string;
  documentType: DocumentType | null;
  name: string | null;
  customFields: CustomField[];
}
