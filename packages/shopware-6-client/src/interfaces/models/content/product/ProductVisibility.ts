import { Product } from "./Product";
import { SalesChannel } from "../../system/sales-channel/SalesChannel";
export interface ProductVisibility {
  visibility: number;
  productId: string;
  salesChannelId: string;
  product: Product | null;
  salesChannel: SalesChannel | null;
}
