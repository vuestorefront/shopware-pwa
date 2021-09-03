import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface DocumentTypeTranslation {
  documentTypeId: string;
  documentType: DocumentType | null;
  name: string | null;
  customFields: CustomField[];
}
