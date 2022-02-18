// category

/**
 * @beta
 */
export const getCategoryEndpoint = () => `/store-api/category`;

/**
 * @beta
 */
export const getCategoryDetailsEndpoint = (categoryId: string) =>
  `/store-api/category/${categoryId}`;

// product-listing

/**
 * @beta
 */
export const getProductListingEndpoint = (categoryId: string) =>
  `/store-api/product-listing/${categoryId}`;

// product

/**
 * @beta
 */
export const getProductEndpoint = () => `/store-api/product`;

/**
 * @beta
 */
export const getProductDetailsEndpoint = (productId: string) =>
  `/store-api/product/${productId}`;

// product-reviews

/**
 * @beta
 */
export const getProductReviewsEndpoint = (productId: string) =>
    `/store-api/product/${productId}/reviews`;

// search

/**
 * @beta
 */
export const getSuggestSearchEndpoint = () => `/store-api/search-suggest`;

/**
 * @beta
 */
export const getSearchEndpoint = () => `/store-api/search`;

// customer
/**
 * @beta
 */
export const getCustomerAddAddressEndpoint = () => `/store-api/account/address`;

/**
 * @beta
 */
export const getCustomerAddressEndpoint = (addressId?: string) =>
  addressId
    ? `/store-api/account/address/${addressId}`
    : "/store-api/account/list-address";

const getCustomerDefaultAddressEndpoint = (type: string, addressId: string) =>
  `/store-api/account/address/default-${type}/${addressId}`;

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
export const getCustomerEndpoint = () => `/store-api/account/customer`;
/**
 * @beta
 */
export const getCustomerRegisterEndpoint = () => `/store-api/account/register`;
/**
 * @beta
 */
export const getCustomerDetailsUpdateEndpoint = () =>
  `/store-api/account/change-profile`;

/**
 * @beta
 */
export const getCustomerLoginEndpoint = () => `/store-api/account/login`;

/**
 * @beta
 */
export const getCustomerLogoutEndpoint = () => `/store-api/account/logout`;

/**
 * @beta
 */
export const getCustomerOrderEndpoint = () => `/store-api/order`;

/**
 * @beta
 */
export const getCustomerUpdateEmailEndpoint = () =>
  `/store-api/account/change-email`;

/**
 * @beta
 */
export const getCustomerUpdatePasswordEndpoint = () =>
  `/store-api/account/change-password`;

/**
 * @beta
 */
export const getCustomerResetPasswordEndpoint = () =>
  `/store-api/account/recovery-password`;

/**
 * @beta
 */
export const getConfirmPasswordResetEndpoint = () =>
  `/store-api/account/recovery-password-confirm`;

/**
 * @public
 */
export const getCustomerAccountConfirmEndpoint = () =>
  `/store-api/account/register-confirm`;

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
export const getCancelOrderEndpoint = () => `/store-api/order/state/cancel`;

/**
 * @beta
 */
export const getChangeOrderPaymentMethodEndpoint = () =>
  `/store-api/order/payment`;

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
export const getContactFormEndpoint = () => `/store-api/contact-form`;
/**
 * @beta
 */
export const handlePaymentEndpoint = () => `/store-api/handle-payment`;

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

/**
 * @beta
 */
export const getGetWishlistProductsEndpoint = () =>
  `/store-api/customer/wishlist`;
/**
 * @beta
 */
export const getAddWishlistProductEndpoint = (productId: string) =>
  `/store-api/customer/wishlist/add/${productId}`;
/**
 * @beta
 */
export const getRemoveWishlistProductEndpoint = (productId: string) =>
  `/store-api/customer/wishlist/delete/${productId}`;
/**
 * @beta
 */
export const getMergeWishlistProductsEndpoint = () =>
  `/store-api/customer/wishlist/merge`;
