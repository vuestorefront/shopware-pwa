import { SalutationTranslationCollection } from "./SalutationTranslationCollection";
import CustomerCollection from "../../checkout/customer/CustomerCollection";
import { CustomerAddressCollection } from "../../checkout/customer/CustomerAddressCollection";
import { OrderAddressCollection } from "../../checkout/order/OrderAddressCollection";
import { NewsletterRecipientCollection } from "../../content/newsletter/NewsletterRecipientCollection";
import { OrderCustomerCollection } from "../../checkout/order/OrderCustomerCollection";
export interface Salutation {
    salutationKey: string;
    displayName: string | null;
    letterName: string | null;
    translations: SalutationTranslationCollection | null;
    customers: CustomerCollection | null;
    customerAddresses: CustomerAddressCollection | null;
    orderCustomers: OrderCustomerCollection | null;
    orderAddresses: OrderAddressCollection | null;
    newsletterRecipients: NewsletterRecipientCollection | null;
}
