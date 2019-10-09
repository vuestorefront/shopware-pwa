import { Media } from "../../content/media/Media";
import { Plugin } from "../../framework/plugin/Plugin";
import CustomerCollection from "../customer/CustomerCollection";
import { SalesChannelCollection } from "../../system/sales-channel/SalesChannelCollection";
import { Rule } from "../../content/rule/Rule";
import { PaymentMethodTranslationCollection } from "./PaymentMethodTranslationCollection";
import { OrderTransactionCollection } from "../order/OrderTransactionCollection";
export interface PaymentMethod {
    pluginId: string | null;
    handlerIdentifier: string;
    name: string | null;
    description: string | null;
    position: number;
    active: boolean;
    plugin: Plugin | null;
    translations: PaymentMethodTranslationCollection | null;
    orderTransactions: OrderTransactionCollection | null;
    customers: CustomerCollection | null;
    salesChannelDefaultAssignments: SalesChannelCollection | null;
    availabilityRule: Rule | null;
    availabilityRuleId: string;
    mediaId: string | null;
    media: Media | null;
    customFields: [] | null;
    formattedHandlerIDentifier: string;
}
