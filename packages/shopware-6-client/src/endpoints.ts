// category

export const CATEGORY_ENDPOINT = () => `/category`;

export const CATEGORY_DETAILS_ENDPOINT = (categoryId: string) =>
  `/category/${categoryId}`;

// product

export const PRODUCT_ENDPOINT = () => `/product`;

export const PRODUCT_DETAILS_ENDPOINT = (productId: string) =>
  `/product/${productId}`;

// customer

export const CUSTOMER_ADDRESS_ENDPOINT = () => `/customer/address`;

export const CUSTOMER_ADDRESS_DETAILS_ENDPOINT = (addressId: string) =>
  `/customer/address/${addressId}`;

export const CUSTOMER_ADDRESS_SET_DEFAULT_SHIPPING_ENDPOINT = (
  addressId: string
) => `/customer/address/${addressId}/default-shipping`;

export const CUSTOMER_ADDRESS_SET_DEFAULT_BILLING_ENDPOINT = (
  addressId: string
) => `/customer/address/${addressId}/default-billing`;

export const CUSTOMER_ENDPOINT = () => `/customer`;

export const CUSTOMER_DETAILS_ENDPOINT = (customerId: string) =>
  `/customer/${customerId}`;

export const CUSTOMER_LOGIN_ENDPOINT = () => `/customer/login`;

export const CUSTOMER_LOGOUT_ENDPOINT = () => `/customer/logout`;

export const CUSTOMER_CURRENT_ORDER_ENDPOINT = () => `/customer/order`;

export const CUSTOMER_ORDER_ENDPOINT = () => `/customer/order`;

// checkout

export const CHECKOUT_CART_ENDPOINT = () => `/checkout/cart`;

export const CHECKOUT_CART_PRODUCT_ENDPOINT = (productId: string) =>
  `/checkout/cart/${productId}`;

export const CHECKOUT_CART_LINE_ITEM_ENDPOINT = (lineItemId: string) =>
  `/checkout/cart/line-item/${lineItemId}`;

export const CHECKOUT_ORDER_ENDPOINT = () => `/checkout/order`;

export const CHECKOUT_GUEST_ORDER_ENDPOINT = () => `/checkout/guest-order`;

export const CHECKOUT_ORDER_PAY_ENDPOINT = (orderId: string) =>
  `/checkout/order/${orderId}/pay`;

export const CHECKOUT_GUEST_ORDER_DETAILS_ENDPOINT = (orderId: string) =>
  `/checkout/guest-order/${orderId}`;

// context

export const CONTEXT_CURRENCY_ENDPOINT = () => `/currecy`;

export const CONTEXT_LANGUAGE_ENDPOINT = () => `/language`;

export const CONTEXT_COUNTRY_ENDPOINT = () => `/country`;

export const CONTEXT_PAYMENT_METHOD_ENDPOINT = () => `/payment-method`;

export const CONTEXT_SHIPPING_METHOD_ENDPOINT = () => `/shipping-method`;

export const CONTEXT_SALUTATION_ENDPOINT = () => `/salutation`;

// newsletter

export const NEWSLETTER_SUBSCRIBE_ENDPOINT = () => `/newsletter/subscrube`;

export const NEWSLETTER_UNSUBSCRIBE_ENDPOINT = () => `/newsletter/unsubscrube`;
