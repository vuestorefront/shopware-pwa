import { CustomField } from "../../common/CustomField";

export interface CustomerGroup {
  id: string;
  name: string;
  display_gross: boolean;
  customFields: CustomField[];
}
