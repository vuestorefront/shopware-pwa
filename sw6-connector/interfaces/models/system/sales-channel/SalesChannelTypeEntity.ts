import { SalesChannelTypeTranslationCollection } from "./SalesChannelTypeTranslationCollection";
import { SalesChannelCollection } from "./SalesChannelCollection";
export interface SalesChannelTypeEntity {
    name: string | null;
    manufacturer: string | null;
    description: string | null;
    descriptionLong: string | null;
    coverUrl: string | null;
    iconName: string | null;
    screenshotUrls: [] | null;
    salesChannels: SalesChannelCollection | null;
    translations: SalesChannelTypeTranslationCollection | null;
    customFields: [] | null;
}
