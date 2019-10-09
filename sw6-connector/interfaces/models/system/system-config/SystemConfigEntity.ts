import { SalesChannelEntity } from "../sales-channel/SalesChannelEntity";
export interface SystemConfigEntity {
    configurationKey: string;
    configurationValue: any;
    salesChannelId: string | null;
    salesChannel: SalesChannelEntity | null;
}
