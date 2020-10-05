// category

export const getCategoryEndpoint = () => `/store-api/v4/category`;

export const getCategoryDetailsEndpoint = () => `/store-api/v4/category`;

// product-listing

export const getProductListingEndpoint = (categoryId: string) =>
  `/store-api/v4/product-listing/${categoryId}`;

// product

export const getProductEndpoint = () => `/sales-channel-api/v3/product`;

export const getProductDetailsEndpoint = (productId: string) =>
  `/store-api/v4/product/${productId}`;

export const getProductsIdsEndpoint = () => `/store-api/v4/product`;

// search

export const getSuggestSearchEndpoint = () => `/store-api/v4/search-suggest`;

export const getSearchEndpoint = () => `/store-api/v4/search`;

// customer
export const getCustomerAddressEndpoint = () => `/store-api/v4/account/address`;

export const getCustomerAddressDetailsEndpoint = (addressId: string) =>
  `/store-api/v4/account/address/${addressId}`;

export const getCustomerAddressListEndpoint = () =>
  `/store-api/v4/account/list-address`;

export const getCustomerAddressSetDefaultShippingEndpoint = (
  addressId: string
) => `/store-api/v4/account/address/default-shipping/${addressId}`;

export const getCustomerAddressSetDefaultBillingEndpoint = (
  addressId: string
) => `/store-api/v4/account/address/default-billing/${addressId}`;

export const getCustomerEndpoint = () => `/store-api/v4/account/customer`;
export const getCustomerRegisterEndpoint = () =>
  `/store-api/v4/account/register`;
export const getCustomerDetailsUpdateEndpoint = () =>
  `/store-api/v4/account/change-profile`;
export const getCustomerDetailsEndpoint = (customerId: string) =>
  `/store-api/v4/customer/${customerId}`;

export const getCustomerLoginEndpoint = () => `/store-api/v4/account/login`;

export const getCustomerLogoutEndpoint = () => `/store-api/v4/account/logout`;

export const getCustomerOrderEndpoint = () => `/store-api/v4/order`;

export const getCustomerOrderDetailsEndpoint = (orderId: string) =>
  `/sales-channel-api/v3/checkout/guest-order/${orderId}`;

export const getCustomerUpdateEmailEndpoint = () =>
  `/store-api/v4/account/change-email`;

export const getCustomerUpdatePasswordEndpoint = () =>
  `/store-api/v4/account/change-password`;

export const getCustomerResetPasswordEndpoint = () =>
  `/store-api/v4/account/recovery-password`;

// checkout

export const getCheckoutCartEndpoint = () => `/store-api/v4/checkout/cart`;

export const getCheckoutCartLineItemEndpoint = () =>
  `/store-api/v4/checkout/cart/line-item`;

export const getCheckoutOrderEndpoint = () => `/store-api/v4/checkout/order`;

export const getCheckoutGuestOrderEndpoint = () =>
  `/store-api/v4/checkout/order`; // { guest: true } (to obtain logged in context token) followed by `/store-api/v4/checkout/order`

// export const getCheckoutGuestOrderDetailsEndpoint = (orderId: string) =>
//   `/sales-channel-api/v3/checkout/guest-order/${orderId}`; // replace with `/store-api/v4/account/order` { ids: [ orderId ] }

export const getCheckoutPromotionCodeEndpoint = (code: string) =>
  `/sales-channel-api/v3/checkout/cart/code/${code}`; // replace with `/store-api/v4/checkout/cart/line-item` - see

// context

export const getContextEndpoint = () => `/store-api/v4/context`;

export const getContextCurrencyEndpoint = () => `/store-api/v4/currency`;

export const getContextLanguageEndpoint = () => `/store-api/v4/language`;

export const getContextCountryEndpoint = () => `/store-api/v4/country`;

export const getContextPaymentMethodEndpoint = () =>
  `/store-api/v4/payment-method`;

export const getContextShippingMethodEndpoint = () =>
  `/store-api/v4/shipping-method`;

export const getContextSalutationEndpoint = () => `/store-api/v4/salutation`;

export const getContextSalutationItemEndpoint = (
  salutationId: string
): string => `/store-api/v4/salutation/${salutationId}`;

// newsletter

export const getNewsletterSubscribeEndpoint = () =>
  `/store-api/v4/newsletter/subscribe`; //consider using `/store-api/v4/newsletter/confirm`

export const getNewsletterUnsubscribeEndpoint = () =>
  `/store-api/v4/newsletter/unsubscribe`;

export const getPageResolverEndpoint = () => `/store-api/v4/pwa/page`;
export const getNavigationEndpoint = () => `/store-api/v4/pwa/navigation`;
export const getStoreNavigationEndpoint = (
  requestActiveId: string,
  requestRootId: string
) => `/store-api/v4/navigation/${requestActiveId}/${requestRootId}`;

export const getContactFormEndpoint = () => `/store-api/v4/contact-form`;
export const getStoreOrderPaymentUrlEndpoint = () =>
  `/store-api/v4/handle-payment`;

export const getStoreNewsletterSubscribeEndpoint = () =>
  `/store-api/v4/newsletter/subscribe`;

export const getStoreNewsletterConfirmEndpoint = () =>
  `/store-api/v4/newsletter/confirm`;

export const getStoreNewsletterUnsubscribeEndpoint = () =>
  `/store-api/v4/newsletter/unsubscribe`;
