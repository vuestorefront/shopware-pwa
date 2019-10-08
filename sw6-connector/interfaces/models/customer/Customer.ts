import { iProductReview } from '../product/Review';
import { iPaymentMethod } from '../checkout/Payment';
import { iBillingAddress, iShippingAddress, iCustomerAddress } from './Address';
import { iTag, iPromotion, iCustomField, iExtension } from '../Common';

interface iCustomerGroup {
  id: string
  name: string
  display_gross: boolean
  customFields: any
}

interface iOrderCustomer {
  email: string
  orderId: string,
  salutationId: string,
  firstName: string,
  lastName: string,
  title: string | null,
  company: string | null,
  customerNumber: number,
  customerId: string,
  customer: string | null,
  salutation: string | null,
  order: string | null,
  customFields: iCustomField,
  _uniqueIdentifier: string,
  versionId: string,
  translated: [],
  createdAt: Date,
  updatedAt: Date | null,
  extensions: any
  id: string,
  orderVersionId: string
}

export interface iCustomer {
  id: string
  groupId: string
  defaultPaymentMethodId: string
  salesChannelId: string
  languageId: string
  lastPaymentMethodId: string | null
  defaultBillingAddressId: string | null
  defaultShippingAddressId: string | null
  customerNumber: number
  salutationId: string | null
  firstName: string
  lastName: string
  company: string | null
  email: string
  title: string | null
  active: boolean
  guest: boolean
  firstLogin: Date | null
  lastLogin: Date | null
  newsletter: boolean
  birthday: Date
  lastOrderDate: Date
  orderCount: number
  createdAt: Date
  updatedAt: Date
  group: iCustomerGroup
  defaultPaymentMethod: iPaymentMethod
  defaultBillingAddress: iBillingAddress
  defaultShippingAddress: iShippingAddress
  activeBillingAddress: iBillingAddress
  activeShippingAddress: iShippingAddress
  addresses: Array<iCustomerAddress>
  orderCustomers: iOrderCustomer | null
  autoIncrement: number
  tags: Array<iTag> | null
  promotions: Array<iPromotion> | null
  customFields: Array<iCustomField> | null
  productReviews: Array<iProductReview>
  _uniqueIdentifier: string
  versionId: string | null
  translated: any
  extensions: Array<iExtension>
}
