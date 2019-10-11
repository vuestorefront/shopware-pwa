import { CustomField } from "../../common/CustomField";

export interface CustomerGroup {
  id: string;
  name: string;
  displayGross: boolean;
  customFields: CustomField[];
}
