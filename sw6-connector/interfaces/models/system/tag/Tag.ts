import { ProductCollection } from "../../content/product/ProductCollection";
import { CategoryCollection } from "../../content/category/CategoryCollection";
import { ShippingMethodCollection } from "../../checkout/shipping/ShippingMethodCollection";
import { MediaCollection } from "../../content/media/MediaCollection";
import { NewsletterRecipientCollection } from "../../content/newsletter/NewsletterRecipientCollection";
import { OrderCollection } from "../../checkout/order/OrderCollection";

export interface TagCollection {
    [index: number]: TagEntity;
}

export interface TagEntity {
    name: string;
    products: ProductCollection|null;
    media: MediaCollection|null;
    categories: CategoryCollection|null;
    orders: OrderCollection|null;
    shippingMethods: ShippingMethodCollection|null;
    newsletterRecipients: NewsletterRecipientCollection|null;
}