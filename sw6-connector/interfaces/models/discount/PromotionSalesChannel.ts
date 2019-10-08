import { SalesChannelEntity } from "../sales-channel/SalesChannelEntity";
import { PromotionEntity } from "./PromotionEntity";
export interface PromotionSalesChannelEntity {
    promotionId: string;
    salesChannelId: string;
    priority: number;
    promotion: PromotionEntity | null;
    salesChannel: SalesChannelEntity | null;
}
