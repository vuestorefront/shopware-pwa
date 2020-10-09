// category

export const getCategoryEndpoint = () => `/sales-channel-api/v3/category`; // will become `/store-api/v4/category`

export const getCategoryDetailsEndpoint = (categoryId: string) =>
  `/sales-channel-api/v3/category/${categoryId}`; // replace with `/store-api/v4/category with { ids: [ categoryId ] }`

// product-listing

export const getProductListingEndpoint = (categoryId: string) =>
  `/store-api/v4/product-listing/${categoryId}`;

// product

export const getProductEndpoint = () => `/sales-channel-api/v3/product`;

export const getProductDetailsEndpoint = (productId: string) =>
  `/sales-channel-api/v3/product/${productId}`; // replace with `/store-api/v4/product`

export const getProductsIdsEndpoint = () =>
  `/sales-channel-api/v3/search-ids/product`; // replace with `/store-api/v4/product with { includes: [ product: [ id ] }`

// search

export const getSuggestSearchEndpoint = () => `/store-api/v3/search-suggest`;

export const getSearchEndpoint = () => `/store-api/v3/search`;

// customer

export const getCustomerAddressEndpoint = (addressId?: string) =>
  addressId
    ? `/sales-channel-api/v3/customer/address/${addressId}` // replace with `/store-api/v4/account/list-address` with { ids: [ addressid ] )
    : "/sales-channel-api/v3/customer/address"; // replace with `/store-api/v4/account/list-address`

const getCustomerDefaultAddressEndpoint = (type: string, addressId: string) =>
  `/sales-channel-api/v3/customer/address/${addressId}/default-${type}`; // replace with `/store-api/v4/context` { includes: { customer: defaultBillingAddress|defaultShipingAddress } }

export const getCustomerDefaultBillingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("billing", addressId);

export const getCustomerDefaultShippingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("shipping", addressId);

export const getCustomerAddressDetailsEndpoint = (addressId: string) =>
  `/sales-channel-api/v3/customer/address/${addressId}`; // replace with `/store-api/v4/account/list-address` { ids: [ addressId  }

export const getCustomerAddressSetDefaultShippingEndpoint = (
  addressId: string
) => `/sales-channel-api/v3/customer/address/${addressId}/default-shipping`; // replace with `/store-api/v4/account/address/default-shipping/{addressId}`

export const getCustomerAddressSetDefaultBillingEndpoint = (
  addressId: string
) => `/sales-channel-api/v3/customer/address/${addressId}/default-billing`; // replace with `/store-api/v4/account/address/default-billing/{addressId}`

export const getCustomerEndpoint = () => `/store-api/v3/account/customer`;
export const getCustomerRegisterEndpoint = () =>
  `/store-api/v3/account/register`;
export const getCustomerDetailsUpdateEndpoint = () =>
  `/store-api/v3/account/change-profile`;
export const getCustomerDetailsEndpoint = (customerId: string) =>
  `/store-api/v3/customer/${customerId}`;

export const getCustomerLoginEndpoint = () => `/store-api/v3/account/login`;

export const getCustomerLogoutEndpoint = () => `/store-api/v3/account/logout`;

export const getCustomerOrderEndpoint = () => `/store-api/v3/order`;

export const getCustomerOrderDetailsEndpoint = (orderId: string) =>
  `/sales-channel-api/v3/checkout/guest-order/${orderId}`;

export const getCustomerUpdateEmailEndpoint = () =>
  `/store-api/v3/account/change-email`;

export const getCustomerUpdatePasswordEndpoint = () =>
  `/store-api/v3/account/change-password`;

export const getCustomerResetPasswordEndpoint = () =>
  `/store-api/v3/account/recovery-password`;

// checkout

export const getCheckoutCartEndpoint = () => `/store-api/v3/checkout/cart`;

export const getCheckoutCartLineItemEndpoint = () =>
  `/store-api/v3/checkout/cart/line-item`;

export const getCheckoutOrderEndpoint = () =>
  `/sales-channel-api/v3/checkout/order`; // replace with `/store-api/v3/account/order`

export const getCheckoutGuestOrderEndpoint = () =>
  `/sales-channel-api/v3/checkout/guest-order`; // replace with `/store-api/v4/checkout/register` { guest: true } (to obtain logged in context token) followed by `/store-api/v4/checkout/order`

export const getCheckoutOrderPayEndpoint = (orderId: string) =>
  `/sales-channel-api/v3/checkout/order/${orderId}/pay`; // replace with `/store-api/v4/handle-payment` { orderId: orderId }

export const getCheckoutGuestOrderDetailsEndpoint = (orderId: string) =>
  `/sales-channel-api/v3/checkout/guest-order/${orderId}`; // replace with `/store-api/v3/account/order` { ids: [ orderId ] }

export const getCheckoutPromotionCodeEndpoint = (code: string) =>
  `/sales-channel-api/v3/checkout/cart/code/${code}`; // replace with `/store-api/v3/checkout/cart/line-item` - see https://docs.shopware.com/en/shopware-platform-dev-en/store-api-guide/cart?category=shopware-platform-dev-en/store-api-guide#promotion

// context

export const getContextEndpoint = () => `/store-api/v3/context`;

export const getContextCurrencyEndpoint = () => `/store-api/v3/currency`;

export const getContextLanguageEndpoint = () => `/store-api/v3/language`;

export const getContextCountryEndpoint = () => `/sales-channel-api/v3/country`; // replace with `/store-api/v4/country`

export const getContextCountryItemEndpoint = (countryId: string): string =>
  `/sales-channel-api/v3/country/${countryId}`; // replace with `/store-api/v4/country` { ids: [ countryId ] }

export const getContextPaymentMethodEndpoint = () =>
  `/store-api/v3/payment-method`;

export const getContextPaymentMethodDetailsEndpoint = (
  paymentId: string
): string => `/sales-channel-api/v3/payment-method/${paymentId}`; // replace with `/store-api/v4/payment-method` { ids: [ paymentId ] }

export const getContextShippingMethodEndpoint = () =>
  `/store-api/v3/shipping-method`;

export const getContextShippingMethodDetailsEndpoint = (
  shippingId: string
): string => `/sales-channel-api/v3/shipping-method/${shippingId}`; // replace with `/store-api/v4/shipping-method` { ids: [ shippingId ] }

export const getContextSalutationEndpoint = () => `/store-api/v3/salutation`;

export const getContextSalutationItemEndpoint = (
  salutationId: string
): string => `/store-api/v3/salutation/${salutationId}`;

// newsletter

export const getNewsletterSubscribeEndpoint = () => `/newsletter/subscribe`; // replace with `/store-api/v4/newsletter/subscribe`, consider using `/store-api/v4/newsletter/confirm`

export const getNewsletterUnsubscribeEndpoint = () => `/newsletter/unsubscribe`; // replace with `/store-api/v4/newsletter/unsubscribe`

export const getPageResolverEndpoint = () => `/store-api/v3/pwa/page`;
export const getNavigationEndpoint = () => `/store-api/v3/pwa/navigation`;
export const getStoreNavigationEndpoint = (
  requestActiveId: string,
  requestRootId: string
) => `/store-api/v3/navigation/${requestActiveId}/${requestRootId}`;
export const getOrderPaymentUrlEndpoint = (orderId: string): string =>
  `/sales-channel-api/v3/checkout/order/${orderId}/pay`; // replace with `/store-api/v4/handle-payment` { orderId: orderId }

export const getContactFormEndpoint = () => `/store-api/v3/contact-form`;
export const getStoreOrderPaymentUrlEndpoint = () =>
  `/store-api/v3/handle-payment`;

export const getStoreNewsletterSubscribeEndpoint = () =>
  `/store-api/v3/newsletter/subscribe`;

export const getStoreNewsletterConfirmEndpoint = () =>
  `/store-api/v3/newsletter/confirm`;

export const getStoreNewsletterUnsubscribeEndpoint = () =>
  `/store-api/v3/newsletter/unsubscribe`;
