// category

export const getCategoryEndpoint = () => `/sales-channel-api/v3/category`;

export const getCategoryDetailsEndpoint = (categoryId: string) =>
  `/sales-channel-api/v3/category/${categoryId}`;

// product-listing

export const getProductListingEndpoint = (categoryId: string) =>
  `/store-api/v3/product-listing/${categoryId}`;

// product

export const getProductEndpoint = () => `/sales-channel-api/v3/product`;

export const getProductDetailsEndpoint = (productId: string) =>
  `/sales-channel-api/v3/product/${productId}`;

export const getProductsIdsEndpoint = () =>
  `/sales-channel-api/v3/search-ids/product`;

// search

export const getSuggestSearchEndpoint = () => `/store-api/v3/search-suggest`;

export const getSearchEndpoint = () => `/store-api/v3/search`;

// customer

export const getCustomerAddressEndpoint = (addressId?: string) =>
  addressId
    ? `/sales-channel-api/v3/customer/address/${addressId}`
    : "/sales-channel-api/v3/customer/address";

const getCustomerDefaultAddressEndpoint = (type: string, addressId: string) =>
  `/sales-channel-api/v3/customer/address/${addressId}/default-${type}`;

export const getCustomerDefaultBillingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("billing", addressId);

export const getCustomerDefaultShippingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("shipping", addressId);

export const getCustomerAddressDetailsEndpoint = (addressId: string) =>
  `/sales-channel-api/v3/customer/address/${addressId}`;

export const getCustomerAddressSetDefaultShippingEndpoint = (
  addressId: string
) => `/sales-channel-api/v3/customer/address/${addressId}/default-shipping`;

export const getCustomerAddressSetDefaultBillingEndpoint = (
  addressId: string
) => `/sales-channel-api/v3/customer/address/${addressId}/default-billing`;

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
  `/sales-channel-api/v3/checkout/order`;

export const getCheckoutGuestOrderEndpoint = () =>
  `/sales-channel-api/v3/checkout/guest-order`;

export const getCheckoutOrderPayEndpoint = (orderId: string) =>
  `/sales-channel-api/v3/checkout/order/${orderId}/pay`;

export const getCheckoutGuestOrderDetailsEndpoint = (orderId: string) =>
  `/sales-channel-api/v3/checkout/guest-order/${orderId}`;

export const getCheckoutPromotionCodeEndpoint = (code: string) =>
  `/sales-channel-api/v3/checkout/cart/code/${code}`;

// context

export const getContextEndpoint = () => `/store-api/v3/context`;

export const getContextCurrencyEndpoint = () => `/store-api/v3/currency`;

export const getContextLanguageEndpoint = () => `/store-api/v3/language`;

export const getContextCountryEndpoint = () => `/sales-channel-api/v3/country`;

export const getContextCountryItemEndpoint = (countryId: string): string =>
  `/sales-channel-api/v3/country/${countryId}`;

export const getContextPaymentMethodEndpoint = () =>
  `/store-api/v3/payment-method`;

export const getContextPaymentMethodDetailsEndpoint = (
  paymentId: string
): string => `/sales-channel-api/v3/payment-method/${paymentId}`;

export const getContextShippingMethodEndpoint = () =>
  `/store-api/v3/shipping-method`;

export const getContextShippingMethodDetailsEndpoint = (
  shippingId: string
): string => `/sales-channel-api/v3/shipping-method/${shippingId}`;

export const getContextSalutationEndpoint = () => `/store-api/v3/salutation`;

export const getContextSalutationItemEndpoint = (
  salutationId: string
): string => `/store-api/v3/salutation/${salutationId}`;

// newsletter

export const getNewsletterSubscribeEndpoint = () => `/newsletter/subscribe`;

export const getNewsletterUnsubscribeEndpoint = () => `/newsletter/unsubscribe`;

export const getPageResolverEndpoint = () => `/store-api/v3/pwa/page`;
export const getNavigationEndpoint = () => `/store-api/v3/pwa/navigation`;
export const getStoreNavigationEndpoint = (
  requestActiveId: string,
  requestRootId: string
) => `/store-api/v3/navigation/${requestActiveId}/${requestRootId}`;
export const getOrderPaymentUrlEndpoint = (orderId: string): string =>
  `/sales-channel-api/v3/checkout/order/${orderId}/pay`;

export const getContactFormEndpoint = () => `/store-api/v3/contact-form`;
export const getStoreOrderPaymentUrlEndpoint = () =>
  `/store-api/v3/handle-payment`;
