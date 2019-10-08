import { SalesChannelEntity } from "../sales-channel/SalesChannelEntity";
import { ProductEntity } from "./ProductEntity";
export interface ProductVisibilityEntity {
    visibility: number;
    productId: string;
    salesChannelId: string;
    product: ProductEntity | null;
    salesChannel: SalesChannelEntity | null;
}
