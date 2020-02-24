import { CustomerGroup } from "./CustomerGroup";
import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface CustomerGroupTranslation {
  customerGroupId: string;
  name: string | null;
  customerGroup: CustomerGroup | null;
  customFields: CustomField[];
}
