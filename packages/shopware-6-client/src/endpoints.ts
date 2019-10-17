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

export const getCustomerAddressEndpoint = () => `/customer/address`;

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

// checkout

export const getCheckoutCartEndpoint = () => `/checkout/cart`;

export const getCheckoutCartProductEndpoint = (productId: string) =>
  `/checkout/cart/${productId}`;

export const getCheckoutCartLineItemEndpoint = (lineItemId: string) =>
  `/checkout/cart/line-item/${lineItemId}`;

export const getCheckoutOrderEndpoint = () => `/checkout/order`;

export const getCheckoutGuestOrderEndpoint = () => `/checkout/guest-order`;

export const getCheckoutOrderPayEndpoint = (orderId: string) =>
  `/checkout/order/${orderId}/pay`;

export const getCheckoutGuestOrderDetailsEndpoint = (orderId: string) =>
  `/checkout/guest-order/${orderId}`;

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
