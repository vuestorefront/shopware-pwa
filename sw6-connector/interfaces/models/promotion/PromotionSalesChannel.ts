import { SalesChannelEntity } from "../../system/sales-channel/SalesChannelEntity";
import { Promotion } from "./Promotion";
export interface PromotionSalesChannel {
    promotionId: string;
    salesChannelId: string;
    priority: number;
    promotion: Promotion | null;
    salesChannel: SalesChannelEntity | null;
}
