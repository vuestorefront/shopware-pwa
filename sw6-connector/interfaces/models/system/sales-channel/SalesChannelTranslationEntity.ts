import { SalesChannelEntity } from "./SalesChannelEntity";
export interface SalesChannelTranslationEntity {
    salesChannelId: string;
    name: string | null;
    salesChannel: SalesChannelEntity | null;
    customFields: [] | null;
}
