import { iCustomField } from "../../Common";
import { CustomerGroup } from "./CustomerGroup";
export interface CustomerGroupTranslation {
    customerGroupId: string;
    name: string | null;
    customerGroup: CustomerGroup | null;
    customFields: iCustomField | null;
}
