import { SalesChannel } from "./SalesChannel";
import { SalesChannelTypeTranslation } from "./SalesChannelTypeTranslation";
import { CustomField } from "../../common/CustomField";

/**
 * @public
 */
export interface SalesChannelType {
  name: string | null;
  manufacturer: string | null;
  description: string | null;
  descriptionLong: string | null;
  coverUrl: string | null;
  iconName: string | null;
  screenshotUrls: [] | null;
  salesChannels: SalesChannel[] | null;
  translations: SalesChannelTypeTranslation[] | null;
  customFields: CustomField[];
}
