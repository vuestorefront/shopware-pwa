// category

export const getCategoryEndpoint = () => `/category`;

export const getCategoryDetailsEndpoint = (categoryId: string) =>
  `/category/${categoryId}`;

// product-listing

export const getProductListingEndpoint = (categoryId: string) => `/store-api/v1/product-listing/${categoryId}`;

// product

export const getProductEndpoint = () => `/sales-channel-api/v1/product`;

export const getProductDetailsEndpoint = (productId: string) =>
  `/sales-channel-api/v1/product/${productId}`;

export const getProductsIdsEndpoint = () => `/search-ids/product`;

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

export const getCustomerOrderEndpoint = () => `/store-api/v1/account/order`;

export const getCustomerOrderDetailsEndpoint = (orderId: string) =>
  `/checkout/guest-order/${orderId}`;

export const getCustomerUpdateEmailEndpoint = () =>
  `/store-api/v1/account/change-email`;

export const getCustomerUpdatePasswordEndpoint = () =>
  `/store-api/v1/account/change-password`;

// checkout

export const getCheckoutCartEndpoint = () => `/checkout/cart`;

export const getCheckoutCartProductEndpoint = (productId: string) =>
  `/checkout/cart/product/${productId}`;

export const getCheckoutCartLineItemEndpoint = (lineItemId: string) =>
  `/checkout/cart/line-item/${lineItemId}`;

export const getCheckoutOrderEndpoint = () => `/checkout/order`;

export const getCheckoutGuestOrderEndpoint = () => `/checkout/guest-order`;

export const getCheckoutOrderPayEndpoint = (orderId: string) =>
  `/checkout/order/${orderId}/pay`;

export const getCheckoutGuestOrderDetailsEndpoint = (orderId: string) =>
  `/checkout/guest-order/${orderId}`;

export const getCheckoutPromotionCodeEndpoint = (code: string) =>
  `/checkout/cart/code/${code}`;

// context

export const getContextEndpoint = () => `/sales-channel-api/v1/context`;

export const getContextCurrencyEndpoint = () => `/sales-channel-api/v1/currency`;

export const getContextLanguageEndpoint = () => `/sales-channel-api/v1/language`;

export const getContextCountryEndpoint = () => `/sales-channel-api/v1/country`;

export const getContextCountryItemEndpoint = (countryId: string): string =>
  `/country/${countryId}`;

export const getContextPaymentMethodEndpoint = () => `/payment-method`;

export const getContextShippingMethodEndpoint = () => `/shipping-method`;

export const getContextSalutationEndpoint = () => `/store-api/v1/salutation`;

export const getContextSalutationItemEndpoint = (
  salutationId: string
): string => `/store-api/v1/salutation/${salutationId}`;

// newsletter

export const getNewsletterSubscribeEndpoint = () => `/newsletter/subscribe`;

export const getNewsletterUnsubscribeEndpoint = () => `/newsletter/unsubscribe`;

export const getPageResolverEndpoint = () => `/store-api/v1/pwa/page`;
export const getNavigationEndpoint = () => `/store-api/v1/pwa/navigation`;
