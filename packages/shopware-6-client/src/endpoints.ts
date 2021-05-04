// category

/**
 * @beta
 */
export const getCategoryEndpoint = () => `/sales-channel-api/v3/category`; // will become `/store-api/v4/category`

/**
 * @beta
 */
export const getCategoryDetailsEndpoint = (categoryId: string) =>
  `/sales-channel-api/v3/category/${categoryId}`; // replace with `/store-api/v4/category with { ids: [ categoryId ] }`

// product-listing

/**
 * @beta
 */
export const getProductListingEndpoint = (categoryId: string) =>
  `/store-api/v4/product-listing/${categoryId}`;

// product

/**
 * @beta
 */
export const getProductEndpoint = () => `/sales-channel-api/v3/product`;

/**
 * @beta
 */
export const getProductDetailsEndpoint = (productId: string) =>
  `/store-api/v3/product/${productId}`;

/**
 * @beta
 */
export const getProductsIdsEndpoint = () =>
  `/sales-channel-api/v3/search-ids/product`; // replace with `/store-api/v4/product with { includes: [ product: [ id ] }`

// search

/**
 * @beta
 */
export const getSuggestSearchEndpoint = () => `/store-api/v3/search-suggest`;

/**
 * @beta
 */
export const getSearchEndpoint = () => `/store-api/v3/search`;

// customer

/**
 * @beta
 */
export const getCustomerAddressEndpoint = (addressId?: string) =>
  addressId
    ? `/sales-channel-api/v3/customer/address/${addressId}` // replace with `/store-api/v4/account/list-address` with { ids: [ addressid ] )
    : "/sales-channel-api/v3/customer/address"; // replace with `/store-api/v4/account/list-address`

const getCustomerDefaultAddressEndpoint = (type: string, addressId: string) =>
  `/sales-channel-api/v3/customer/address/${addressId}/default-${type}`; // replace with `/store-api/v4/context` { includes: { customer: defaultBillingAddress|defaultShipingAddress } }

/**
 * @beta
 */
export const getCustomerDefaultBillingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("billing", addressId);

/**
 * @beta
 */
export const getCustomerDefaultShippingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("shipping", addressId);

/**
 * @beta
 */
export const getCustomerAddressDetailsEndpoint = (addressId: string) =>
  `/sales-channel-api/v3/customer/address/${addressId}`; // replace with `/store-api/v4/account/list-address` { ids: [ addressId  }

/**
 * @beta
 */
export const getCustomerAddressSetDefaultShippingEndpoint = (
  addressId: string
) => `/sales-channel-api/v3/customer/address/${addressId}/default-shipping`; // replace with `/store-api/v4/account/address/default-shipping/{addressId}`

/**
 * @beta
 */
export const getCustomerAddressSetDefaultBillingEndpoint = (
  addressId: string
) => `/sales-channel-api/v3/customer/address/${addressId}/default-billing`; // replace with `/store-api/v4/account/address/default-billing/{addressId}`

/**
 * @beta
 */
export const getCustomerEndpoint = () => `/store-api/v3/account/customer`;
/**
 * @beta
 */
export const getCustomerRegisterEndpoint = () =>
  `/store-api/v3/account/register`;
/**
 * @beta
 */
export const getCustomerDetailsUpdateEndpoint = () =>
  `/store-api/v3/account/change-profile`;
/**
 * @beta
 */
export const getCustomerDetailsEndpoint = (customerId: string) =>
  `/store-api/v3/customer/${customerId}`;

/**
 * @beta
 */
export const getCustomerLoginEndpoint = () => `/store-api/v3/account/login`;

/**
 * @beta
 */
export const getCustomerLogoutEndpoint = () => `/store-api/v3/account/logout`;

/**
 * @beta
 */
export const getCustomerOrderEndpoint = () => `/store-api/v3/order`;

/**
 * @beta
 */
export const getCustomerOrderDetailsEndpoint = (orderId: string) =>
  `/sales-channel-api/v3/checkout/guest-order/${orderId}`;

/**
 * @beta
 */
export const getCustomerUpdateEmailEndpoint = () =>
  `/store-api/v3/account/change-email`;

/**
 * @beta
 */
export const getCustomerUpdatePasswordEndpoint = () =>
  `/store-api/v3/account/change-password`;

/**
 * @beta
 */
export const getCustomerResetPasswordEndpoint = () =>
  `/store-api/v3/account/recovery-password`;

// checkout

/**
 * @beta
 */
export const getCheckoutCartEndpoint = () => `/store-api/checkout/cart`;

/**
 * @beta
 */
export const getCheckoutCartLineItemEndpoint = () =>
  `/store-api/checkout/cart/line-item`;

/**
 * @beta
 */
export const getCheckoutOrderEndpoint = () => `/store-api/checkout/order`;

/**
 * @beta
 */
export const getCheckoutOrderPayEndpoint = (orderId: string) =>
  `/sales-channel-api/v3/checkout/order/${orderId}/pay`; // replace with `/store-api/v4/handle-payment` { orderId: orderId }

/**
 * @beta
 */
export const getCheckoutPromotionCodeEndpoint = (code: string) =>
  `/sales-channel-api/v3/checkout/cart/code/${code}`; // replace with `/store-api/checkout/cart/line-item` - see https://docs.shopware.com/en/shopware-platform-dev-en/store-api-guide/cart?category=shopware-platform-dev-en/store-api-guide#promotion

// context

/**
 * @beta
 */
export const getContextEndpoint = () => `/store-api/context`;

/**
 * @beta
 */
export const getContextCurrencyEndpoint = () => `/store-api/currency`;

/**
 * @beta
 */
export const getContextLanguageEndpoint = () => `/store-api/language`;

/**
 * @beta
 */
export const getContextCountryEndpoint = () => `/store-api/country`;

/**
 * @beta
 */
export const getContextPaymentMethodEndpoint = () =>
  `/store-api/payment-method`;

/**
 * @beta
 */
export const getContextShippingMethodEndpoint = () =>
  `/store-api/shipping-method`;

/**
 * @beta
 */
export const getContextSalutationEndpoint = () => `/store-api/salutation`;

// newsletter

/**
 * @beta
 */
export const getNewsletterSubscribeEndpoint = () => `/newsletter/subscribe`; // replace with `/store-api/v4/newsletter/subscribe`, consider using `/store-api/v4/newsletter/confirm`

/**
 * @beta
 */
export const getNewsletterUnsubscribeEndpoint = () => `/newsletter/unsubscribe`; // replace with `/store-api/v4/newsletter/unsubscribe`

/**
 * @beta
 */
export const getPageResolverEndpoint = () => `/store-api/pwa/page`;

/**
 * @beta
 */
export const getSeoUrlEndpoint = () => "/store-api/seo-url";

/**
 * @beta
 */
export const getStoreNavigationEndpoint = (
  requestActiveId: string,
  requestRootId: string
) => `/store-api/navigation/${requestActiveId}/${requestRootId}`;
/**
 * @beta
 */
export const getOrderPaymentUrlEndpoint = (orderId: string): string =>
  `/sales-channel-api/v3/checkout/order/${orderId}/pay`; // replace with `/store-api/v4/handle-payment` { orderId: orderId }

/**
 * @beta
 */
export const getContactFormEndpoint = () => `/store-api/contact-form`;
/**
 * @beta
 */
export const getStoreOrderPaymentUrlEndpoint = () =>
  `/store-api/handle-payment`;

/**
 * @beta
 */
export const getStoreNewsletterSubscribeEndpoint = () =>
  `/store-api/newsletter/subscribe`;

/**
 * @beta
 */
export const getStoreNewsletterConfirmEndpoint = () =>
  `/store-api/newsletter/confirm`;

/**
 * @beta
 */
export const getStoreNewsletterUnsubscribeEndpoint = () =>
  `/store-api/newsletter/unsubscribe`;
