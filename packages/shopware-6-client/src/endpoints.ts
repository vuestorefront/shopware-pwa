// category

export const getCategoryEndpoint = () => `/category`;

export const getCategoryDetailsEndpoint = (categoryId: string) =>
  `/category/${categoryId}`;

// product

export const getProductEndpoint = () => `/product`;

export const getProductDetailsEndpoint = (productId: string) =>
  `/product/${productId}`;

export const getProductsIdsEndpoint = () => `/search-ids/product`;

// customer

export const getCustomerAddressEndpoint = (addressId?: string) =>
  addressId ? `/customer/address/${addressId}` : "/customer/address";

const getCustomerDefaultAddressEndpoint = (type: string, addressId: string) =>
  `/customer/address/${addressId}/default-${type}`;

export const getCustomerDefaultBillingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("billing", addressId);

export const getCustomerDefaultShippingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("shipping", addressId);

export const getCustomerAddressDetailsEndpoint = (addressId: string) =>
  `/customer/address/${addressId}`;

export const getCustomerAddressSetDefaultShippingEndpoint = (
  addressId: string
) => `/customer/address/${addressId}/default-shipping`;

export const getCustomerAddressSetDefaultBillingEndpoint = (
  addressId: string
) => `/customer/address/${addressId}/default-billing`;

export const getCustomerEndpoint = () => `/customer`;

export const getCustomerDetailsEndpoint = (customerId: string) =>
  `/customer/${customerId}`;

export const getCustomerLoginEndpoint = () => `/customer/login`;

export const getCustomerLogoutEndpoint = () => `/customer/logout`;

export const getCustomerOrderEndpoint = () => `/customer/order`;

export const getCustomerOrderDetailsEndpoint = (orderId: string) =>
  `/checkout/guest-order/${orderId}`;

export const getCustomerUpdateEmailEndpoint = () => `/customer/email`;

export const getCustomerUpdatePasswordEndpoint = () => `/customer/password`;

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

export const getContextEndpoint = () => `/context`;

export const getContextCurrencyEndpoint = () => `/currency`;

export const getContextLanguageEndpoint = () => `/language`;

export const getContextCountryEndpoint = () => `/country`;

export const getContextPaymentMethodEndpoint = () => `/payment-method`;

export const getContextShippingMethodEndpoint = () => `/shipping-method`;

export const getContextSalutationEndpoint = () => `/salutation`;

// newsletter

export const getNewsletterSubscribeEndpoint = () => `/newsletter/subscribe`;

export const getNewsletterUnsubscribeEndpoint = () => `/newsletter/unsubscribe`;

export const getPageResolverEndpoint = () => `/vsf/page`;
export const getNavigationEndpoint = () => `/vsf/navigation`;
