import { IProductCollection } from "./IProduct";
import { ICategoryCollection } from "./ICategoryCollection";
import { IShippingMethodCollection } from "./IContext";
import { IMediaCollection } from "./IMediaEntity";
import { INewsletterRecipientCollection } from "./INewsletter"
import { IOrderCollection } from "./IOrder";
import { IOrderEntity } from "./IOrder";

export interface ITagCollection {
    [index: number]: ITagEntity;
}

interface ITagEntity {
    name: string;
    products: IProductCollection|null;
    media: IMediaCollection|null;
    categories: ICategoryCollection|null;
    orders: IOrderCollection|null;
    shippingMethods: IShippingMethodCollection|null;
    newsletterRecipients: INewsletterRecipientCollection|null;
}