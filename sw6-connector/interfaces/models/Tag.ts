import { ProductCollection } from "./product/ProductCollection";
import { CategoryCollection } from "./category/CategoryCollection";
import { ShippingMethodCollection } from "./context/Context";
import { MediaCollection } from "./media/MediaCollection";
import { NewsletterRecipientCollection } from "./newsletter/NewsletterRecipientCollection";
import { OrderCollection } from "./checkout/OrderCollection";

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