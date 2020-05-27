// category

export const getCategoryEndpoint = () => `/sales-channel-api/v1/category`;

export const getCategoryDetailsEndpoint = (categoryId: string) =>
  `/sales-channel-api/v1/category/${categoryId}`;

// product-listing

export const getProductListingEndpoint = (categoryId: string) =>
  `/store-api/v1/product-listing/${categoryId}`;

// product

export const getProductEndpoint = () => `/sales-channel-api/v1/product`;

export const getProductDetailsEndpoint = (productId: string) =>
  `/sales-channel-api/v1/product/${productId}`;

export const getProductsIdsEndpoint = () =>
  `/sales-channel-api/v1/search-ids/product`;

// customer

export const getCustomerAddressEndpoint = (addressId?: string) =>
  addressId
    ? `/sales-channel-api/v1/customer/address/${addressId}`
    : "/sales-channel-api/v1/customer/address";

const getCustomerDefaultAddressEndpoint = (type: string, addressId: string) =>
  `/sales-channel-api/v1/customer/address/${addressId}/default-${type}`;

export const getCustomerDefaultBillingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("billing", addressId);

export const getCustomerDefaultShippingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("shipping", addressId);

export const getCustomerAddressDetailsEndpoint = (addressId: string) =>
  `/sales-channel-api/v1/customer/address/${addressId}`;

export const getCustomerAddressSetDefaultShippingEndpoint = (
  addressId: string
) => `/sales-channel-api/v1/customer/address/${addressId}/default-shipping`;

export const getCustomerAddressSetDefaultBillingEndpoint = (
  addressId: string
) => `/sales-channel-api/v1/customer/address/${addressId}/default-billing`;

export const getCustomerEndpoint = () => `/store-api/v1/account/customer`;
export const getCustomerRegisterEndpoint = () =>
  `/store-api/v1/account/register`;
export const getCustomerDetailsUpdateEndpoint = () =>
  `/store-api/v1/account/change-profile`;
export const getCustomerDetailsEndpoint = (customerId: string) =>
  `/store-api/v1/customer/${customerId}`;

export const getCustomerLoginEndpoint = () => `/store-api/v1/account/login`;

export const getCustomerLogoutEndpoint = () => `/store-api/v1/account/logout`;

export const getCustomerOrderEndpoint = () => `/store-api/v1/order`;

export const getCustomerOrderDetailsEndpoint = (orderId: string) =>
  `/sales-channel-api/v1/checkout/guest-order/${orderId}`;

export const getCustomerUpdateEmailEndpoint = () =>
  `/store-api/v1/account/change-email`;

export const getCustomerUpdatePasswordEndpoint = () =>
  `/store-api/v1/account/change-password`;

export const getCustomerResetPasswordEndpoint = () =>
  `/store-api/v1/account/recovery-password`;

// checkout

export const getCheckoutCartEndpoint = () =>
  `/sales-channel-api/v1/checkout/cart`;

export const getCheckoutCartProductEndpoint = (productId: string) =>
  `/sales-channel-api/v1/checkout/cart/product/${productId}`;

export const getCheckoutCartLineItemEndpoint = (lineItemId: string) =>
  `/sales-channel-api/v1/checkout/cart/line-item/${lineItemId}`;

export const getCheckoutOrderEndpoint = () =>
  `/sales-channel-api/v1/checkout/order`;

export const getCheckoutGuestOrderEndpoint = () =>
  `/sales-channel-api/v1/checkout/guest-order`;

export const getCheckoutOrderPayEndpoint = (orderId: string) =>
  `/sales-channel-api/v1/checkout/order/${orderId}/pay`;

export const getCheckoutGuestOrderDetailsEndpoint = (orderId: string) =>
  `/sales-channel-api/v1/checkout/guest-order/${orderId}`;

export const getCheckoutPromotionCodeEndpoint = (code: string) =>
  `/sales-channel-api/v1/checkout/cart/code/${code}`;

// context

export const getContextEndpoint = () => `/store-api/v1/context`;

export const getContextCurrencyEndpoint = () => `/store-api/v1/currency`;

export const getContextLanguageEndpoint = () => `/store-api/v1/language`;

export const getContextCountryEndpoint = () => `/sales-channel-api/v1/country`;

export const getContextCountryItemEndpoint = (countryId: string): string =>
  `/sales-channel-api/v1/country/${countryId}`;

export const getContextPaymentMethodEndpoint = () =>
  `/store-api/v1/payment-method`;

export const getContextPaymentMethodDetailsEndpoint = (
  paymentId: string
): string => `/sales-channel-api/v1/payment-method/${paymentId}`;

export const getContextShippingMethodEndpoint = () =>
  `/store-api/v1/shipping-method`;

export const getContextShippingMethodDetailsEndpoint = (
  shippingId: string
): string => `/sales-channel-api/v1/shipping-method/${shippingId}`;

export const getContextSalutationEndpoint = () => `/store-api/v1/salutation`;

export const getContextSalutationItemEndpoint = (
  salutationId: string
): string => `/store-api/v1/salutation/${salutationId}`;

// newsletter

export const getNewsletterSubscribeEndpoint = () => `/newsletter/subscribe`;

export const getNewsletterUnsubscribeEndpoint = () => `/newsletter/unsubscribe`;

export const getPageResolverEndpoint = () => `/store-api/v1/pwa/page`;
export const getNavigationEndpoint = () => `/store-api/v1/pwa/navigation`;
export const getOrderPaymentUrlEndpoint = (orderId: string): string =>
  `/sales-channel-api/v1/checkout/order/${orderId}/pay`;
