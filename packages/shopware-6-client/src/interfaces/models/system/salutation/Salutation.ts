import { SalutationTranslation } from "./SalutationTranslation";
import { Customer } from "../../checkout/customer/Customer";
import { CustomerAddress } from "../../checkout/customer/CustomerAddress";
import { OrderCustomer } from "../../checkout/order/OrderCustomer";
import { OrderAddress } from "../../checkout/order/OrderAddress";
import { NewsletterRecipient } from "../../content/newsletter/NewsletterRecipient";

/**
 * @alpha
 */
export interface Salutation {
  salutationKey: string;
  displayName: string | null;
  letterName: string | null;
  translations: SalutationTranslation[] | null;
  customers: Customer[] | null;
  customerAddresses: CustomerAddress[] | null;
  orderCustomers: OrderCustomer[] | null;
  orderAddresses: OrderAddress[] | null;
  newsletterRecipients: NewsletterRecipient[] | null;
}
