import { CustomerAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/CustomerAddress";
import { OrderLineItem } from "@shopware-pwa/commons/interfaces/models/checkout/order/OrderLineItem";
import { StateMachineState } from "@shopware-pwa/commons/interfaces/models/system/state-machine/StateMachineState";
import { OrderTransaction } from "./OrderTransaction";
import { Tag } from "@shopware-pwa/commons/interfaces/models/system/tag/Tag";
import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";
import { Language } from "@shopware-pwa/commons/interfaces/models/framework/language/Language";
import { SalesChannel } from "@shopware-pwa/commons/interfaces/models/system/sales-channel/SalesChannel";
import { CustomFields } from "@shopware-pwa/commons/interfaces/models/common/CustomField";

interface CalculatedTax {
  tax: number;
  taxRate: number;
  price: number;
  extensions: any[];
}
interface TaxRule {
  taxRate: number;
  percentage: number;
  extensions: any[];
}
interface Price {
  netPrice: number;
  totalPrice: number;
  calculatedTaxes: CalculatedTax[];
  taxRules: TaxRule[];
  positionPrice: number;
  taxStatus: string;
  extensions: any[];
}

interface ShippingCost {
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  calculatedTaxes: CalculatedTax[];
  taxRules: TaxRule[];
  referencePrice: number | null;
  listPrice: number | null;
  extensions: any[];
}

interface OrderCustomer {
  email: string;
  orderId: string;
  salutationId: string;
  firstName: string;
  lastName: string;
  title: null;
  company: null;
  customerNumber: number;
  customerId: string;
  customer: null;
  salutation: null;
  order: null;
  customFields: null;
  remoteAddress: string;
  _uniqueIdentifier: string;
  versionId: string;
  translated: [];
  createdAt: Date;
  updatedAt: null;
  extensions: any;
  id: string;
  orderVersionId: string;
}

export interface Order {
  orderNumber: number;
  currencyId: string;
  currencyFactor: number;
  salesChannelId: string;
  billingAddressId: string;
  orderDateTime: Date;
  orderDate: Date;
  price: Price;
  amountTotal: number;
  amountNet: number;
  positionPrice: number;
  taxStatus: string;
  shippingCosts: ShippingCost;
  shippingTotal: number;
  orderCustomer: OrderCustomer;
  currency: Currency | null;
  languageId: string;
  language: Language | null;
  salesChannel: SalesChannel | null;
  addresses: CustomerAddress[];
  deliveries: null;
  lineItems: OrderLineItem[] | null;
  transactions: OrderTransaction[] | null;
  deepLinkCode: string;
  stateMachineState: StateMachineState;
  stateId: string;
  customFields: CustomFields;
  documents: null;
  tags: Tag[] | null;
  affiliateCode: string | null;
  campaignCode: string | null;
  _uniqueIdentifier: string;
  versionId: string;
  translated: any[];
  createdAt: Date;
  updatedAt: Date | null;
  extensions: any;
  id: string;
  billingAddressVersionId: string;
}
