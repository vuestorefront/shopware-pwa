import { SalesChannel } from "../../system/sales-channel/SalesChannel";
import { Language } from "../../framework/language/Language";
import { Product } from "./Product";
import { Customer } from "../../checkout/customer/Customer";

/**
 * @public
 */
export interface ProductReview {
  id: string;
  productId: string;
  customerId: string;
  salesChannelId: string;
  languageId: string;
  externalUser: string | null;
  externalEmail: string | null;
  points: number | null;
  status: boolean;
  comment: string | null;
  salesChannel: SalesChannel | null;
  language: Language | null;
  customer: Customer | null;
  product: Product | null;
  content: string | null;
  title: string | null;
  createdAt: Date;
}
