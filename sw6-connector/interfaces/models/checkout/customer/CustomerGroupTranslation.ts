
import { CustomerGroup } from "./CustomerGroup";
import { CustomField } from "../../Common";
export interface CustomerGroupTranslation {
    customerGroupId: string;
    name: string | null;
    customerGroup: CustomerGroup | null;
    customFields: CustomField | null;
}
