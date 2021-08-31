import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface CustomerGroup {
  id: string;
  name: string;
  displayGross: boolean;
  customFields: CustomField[];
}
