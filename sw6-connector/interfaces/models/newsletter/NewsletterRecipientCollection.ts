import { LanguageEntity } from "../context/language/LanguageEntity";
import { SalesChannelEntity } from "../sales-channel/SalesChannelEntity";
import { iCustomField } from "../Common";
import { TagCollection } from "../Tag";
import { SalutationTranslationCollection } from "../context/salutation/SalutationTranslationCollection";
import CustomerCollection from "../customer/CustomerCollection";
import { CustomerAddressCollection } from "../customer/CustomerAddressCollection";
import { OrderAddressCollection } from "../checkout/OrderAddressCollection";
import { iCustomer } from "../customer/Customer";
import { OrderEntity } from "../checkout/Order";

export interface NewsletterRecipientCollection {
    [index: number]: NewsletterRecipient;
}

interface NewsletterRecipient {
    email: string;
    title: string|null;
    firstName: string|null;
    lastName: string|null;
    zipCode: string|null;
    city: string|null;
    street: string|null;
    status: string|null;
    hash: string;
    salutationId: string|null;
    salutation: SalutationEntity|null;
    languageId: string;
    language: LanguageEntity|null;
    salesChannelId: string;
    salesChannel: SalesChannelEntity|null;
    customFields: iCustomField|null;
    confirmedAt: Date|null;
    createdAt: Date;
    updatedAt: Date|null;
    tags: TagCollection|null;
}

interface SalutationEntity {
    salutationKey: string;
    displayName: string|null;
    letterName: string|null;
    translations: SalutationTranslationCollection|null;
    customers: CustomerCollection|null;
    customerAddresses: CustomerAddressCollection|null;
    orderCustomers: OrderCustomerCollection|null;
    orderAddresses: OrderAddressCollection|null;
    newsletterRecipients: NewsletterRecipientCollection|null;
}

interface OrderCustomerCollection {
    [index: number]: OrderCustomer;
}

interface OrderCustomer {
    email: string;
    orderId: string;
    salutationId: string;
    firstName: string;
    lastName: string;
    title: string|null;
    company: string|null;
    customerNumber: string|null;
    customerId: string;
    customer: iCustomer|null;
    salutation: SalutationEntity|null;
    order: OrderEntity|null;
}