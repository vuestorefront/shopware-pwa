import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface DocumentTypeTranslation {
  documentTypeId: string;
  documentType: DocumentType | null;
  name: string | null;
  customFields: CustomField[];
}
