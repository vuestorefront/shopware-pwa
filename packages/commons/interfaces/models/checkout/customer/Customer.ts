import { ProductReview } from "../../content/product/ProductReview";
import { PaymentMethod } from "../payment/PaymentMethod";
import { CustomerGroup } from "./CustomerGroup";
import { OrderCustomer } from "../../checkout/order/OrderCustomer";
import { ShippingAddress } from "./ShippingAddress";
import { BillingAddress } from "./BillingAddress";
import { CustomerAddress } from "./CustomerAddress";
import { Promotion } from "../promotion/Promotion";
import { Tag } from "../../system/tag/Tag";
import { CustomField } from "../../common/CustomField";

/**
 * @beta
 */
export interface Customer {
  id: string;
  groupId: string;
  defaultPaymentMethodId: string;
  salesChannelId: string;
  languageId: string;
  lastPaymentMethodId: string | null;
  defaultBillingAddressId: string | null;
  defaultShippingAddressId: string | null;
  customerNumber: number;
  salutationId: string | null;
  firstName: string;
  lastName: string;
  company: string | null;
  email: string;
  title: string | null;
  active: boolean;
  guest: boolean;
  firstLogin: Date | null;
  lastLogin: Date | null;
  newsletter: boolean;
  birthday: Date;
  lastOrderDate: Date;
  orderCount: number;
  createdAt: Date;
  updatedAt: Date;
  group: CustomerGroup;
  defaultPaymentMethod: PaymentMethod;
  defaultBillingAddress: BillingAddress;
  defaultShippingAddress: ShippingAddress;
  activeBillingAddress: BillingAddress;
  activeShippingAddress: ShippingAddress;
  addresses: Array<CustomerAddress>;
  orderCustomers: Array<OrderCustomer> | null;
  autoIncrement: number;
  tags: Tag[] | null;
  promotions: Promotion[] | null;
  customFields: CustomField[];
  productReviews: ProductReview[];
  doubleOptInConfirmDate: null | string;
  doubleOptInEmailSentDate: string;
  doubleOptInRegistration: boolean;
}
