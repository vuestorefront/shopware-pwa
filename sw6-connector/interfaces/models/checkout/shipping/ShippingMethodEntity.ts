import { SalesChannelCollection } from "../../system/sales-channel/SalesChannelCollection";
import { iCustomField } from "../../Common";
import { DeliveryTime } from "../delivery/DeliveryTime";
import { OrderDeliveryCollection } from "../order/OrderDeliveryCollection";
import { Rule } from "../../content/rule/Rule";
import { ShippingMethodPriceCollection } from "./ShippingMethodPriceCollection";
import { Media } from "../../content/media/Media";
import { TagCollection } from "../../system/tag/Tag";
import { ShippingMethodTranslationCollection } from "./ShippingMethodTranslationCollection";
export interface ShippingMethodEntity {
    name: string | null;
    active: boolean;
    description: string | null;
    deliveryTimeId: string;
    deliveryTime: DeliveryTime | null;
    translations: ShippingMethodTranslationCollection | null;
    orderDeliveries: OrderDeliveryCollection | null;
    salesChannelDefaultAssignments: SalesChannelCollection | null;
    salesChannels: SalesChannelCollection | null;
    customFields: iCustomField | null;
    availabilityRule: Rule | null;
    availabilityRuleId: string;
    prices: ShippingMethodPriceCollection;
    mediaId: string | null;
    media: Media | null;
    tags: TagCollection | null;
}
