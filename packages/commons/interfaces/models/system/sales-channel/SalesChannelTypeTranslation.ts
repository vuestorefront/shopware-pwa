import { SalesChannelType } from "./SalesChannelType";
import { CustomField } from "../../common/CustomField";

/**
 * @alpha
 */
export interface SalesChannelTypeTranslation {
  salesChannelTypeId: string;
  name: string | null;
  manufacturer: string | null;
  description: string | null;
  descriptionLong: string | null;
  salesChannelType: SalesChannelType | null;
  customFields: CustomField[];
}
