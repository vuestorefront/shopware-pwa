import { MediaEntity } from "../media/MediaEntity";
import { PluginEntity } from "../plugin/PluginEntity";
import CustomerCollection from "../customer/CustomerCollection";
import { SalesChannelCollection } from "../sales-channel/SalesChannelCollection";
import { RuleEntity } from "../rule/RuleEntity";
import { PaymentMethodTranslationCollection } from "./PaymentMethodTranslationCollection";
import { OrderTransactionCollection } from "./OrderTransactionCollection";
export interface PaymentMethodEntity {
    pluginId: string | null;
    handlerIdentifier: string;
    name: string | null;
    description: string | null;
    position: number;
    active: boolean;
    plugin: PluginEntity | null;
    translations: PaymentMethodTranslationCollection | null;
    orderTransactions: OrderTransactionCollection | null;
    customers: CustomerCollection | null;
    salesChannelDefaultAssignments: SalesChannelCollection | null;
    availabilityRule: RuleEntity | null;
    availabilityRuleId: string;
    mediaId: string | null;
    media: MediaEntity | null;
    customFields: [] | null;
    formattedHandlerIDentifier: string;
}
