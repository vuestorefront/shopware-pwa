import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface CustomerGroup {
  id: string;
  name: string;
  displayGross: boolean;
  customFields: CustomField[];
}
