import { SalesChannelTypeEntity } from "./SalesChannelTypeEntity";
export interface SalesChannelTypeTranslationEntity {
    salesChannelTypeId: string;
    name: string | null;
    manufacturer: string | null;
    description: string | null;
    descriptionLong: string | null;
    salesChannelType: SalesChannelTypeEntity | null;
    customFields: [] | null;
}
