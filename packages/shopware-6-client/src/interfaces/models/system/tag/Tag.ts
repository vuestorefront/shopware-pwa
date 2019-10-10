import { Product } from "../../content/product/Product";
import { Media } from "../../content/media/Media";
import { Category } from "packages/shopware-6-client/src";
import { Order } from "../../checkout/order/Order";
import { NewsletterRecipient } from "../../content/newsletter/NewsletterRecipient";
import { ShippingMethod } from "../../checkout/shipping/ShippingMethod";

export interface Tag {
  name: string;
  products: Product[] | null;
  media: Media[] | null;
  categories: Category[] | null;
  orders: Order[] | null;
  shippingMethods: ShippingMethod[] | null;
  newsletterRecipients: NewsletterRecipient[] | null;
}
