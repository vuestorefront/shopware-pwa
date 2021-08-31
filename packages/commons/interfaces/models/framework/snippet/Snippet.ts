import { SnippetSet } from "./SnippetSet";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface Snippet {
  setId: string;
  translationKey: string;
  value: string;
  author: string;
  set: SnippetSet | null;
  customFields: CustomField | null;
}
