import { iCustomField } from "../../Common";
export interface DocumentTypeTranslation {
    documentTypeId: string;
    documentType: DocumentType | null;
    name: string | null;
    customFields: iCustomField;
}
