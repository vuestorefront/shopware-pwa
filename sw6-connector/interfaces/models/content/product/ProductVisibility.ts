
import { Product } from "./Product";
import { SalesChannelEntity } from "../../system/sales-channel/SalesChannelEntity";
export interface ProductVisibility {
    visibility: number;
    productId: string;
    salesChannelId: string;
    product: Product | null;
    salesChannel: SalesChannelEntity | null;
}
