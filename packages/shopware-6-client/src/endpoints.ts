// category

/**
 * @public
 */
export const getCategoryEndpoint = () => `/store-api/category`;

/**
 * @public
 */
export const getCategoryDetailsEndpoint = (categoryId: string) =>
  `/store-api/category/${categoryId}`;

// landing-page
/**
 * @public
 */
export const getLandingPageDetailsEndpoint = (landingPageId: string) =>
  `/store-api/landing-page/${landingPageId}`;

// product-listing

/**
 * @public
 */
export const getProductListingEndpoint = (categoryId: string) =>
  `/store-api/product-listing/${categoryId}`;

// product

/**
 * @public
 */
export const getProductEndpoint = () => `/store-api/product`;

/**
 * @public
 */
export const getProductDetailsEndpoint = (productId: string) =>
  `/store-api/product/${productId}`;

// product-reviews

/**
 * @public
 */
export const getProductReviewsEndpoint = (productId: string) =>
  `/store-api/product/${productId}/reviews`;

// search

/**
 * @public
 */
export const getSuggestSearchEndpoint = () => `/store-api/search-suggest`;

/**
 * @public
 */
export const getSearchEndpoint = () => `/store-api/search`;

// customer
/**
 * @public
 */
export const getCustomerAddAddressEndpoint = () => `/store-api/account/address`;

/**
 * @public
 */
export const getCustomerAddressEndpoint = (addressId?: string) =>
  addressId
    ? `/store-api/account/address/${addressId}`
    : "/store-api/account/list-address";

const getCustomerDefaultAddressEndpoint = (type: string, addressId: string) =>
  `/store-api/account/address/default-${type}/${addressId}`;

/**
 * @public
 */
export const getCustomerDefaultBillingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("billing", addressId);

/**
 * @public
 */
export const getCustomerDefaultShippingAddressEndpoint = (addressId: string) =>
  getCustomerDefaultAddressEndpoint("shipping", addressId);

/**
 * @public
 */
export const getCustomerEndpoint = () => `/store-api/account/customer`;
/**
 * @public
 */
export const getCustomerRegisterEndpoint = () => `/store-api/account/register`;
/**
 * @public
 */
export const getCustomerDetailsUpdateEndpoint = () =>
  `/store-api/account/change-profile`;

/**
 * @public
 */
export const getCustomerLoginEndpoint = () => `/store-api/account/login`;

/**
 * @public
 */
export const getCustomerLogoutEndpoint = () => `/store-api/account/logout`;

/**
 * @public
 */
export const getCustomerOrderEndpoint = () => `/store-api/order`;

/**
 * @public
 */
export const getCustomerUpdateEmailEndpoint = () =>
  `/store-api/account/change-email`;

/**
 * @public
 */
export const getCustomerUpdatePasswordEndpoint = () =>
  `/store-api/account/change-password`;

/**
 * @public
 */
export const getCustomerResetPasswordEndpoint = () =>
  `/store-api/account/recovery-password`;

/**
 * @public
 */
export const getConfirmPasswordResetEndpoint = () =>
  `/store-api/account/recovery-password-confirm`;

/**
 * @public
 */
export const getCustomerAccountConfirmEndpoint = () =>
  `/store-api/account/register-confirm`;

/**
 * @public
 */
export const getCustomerUpdatePaymentMethodEndpoint = (
  paymentMethodId: string
) => `/account/change-payment-method/${paymentMethodId}`;

// checkout

/**
 * @public
 */
export const getCheckoutCartEndpoint = () => `/store-api/checkout/cart`;

/**
 * @public
 */
export const getCheckoutCartLineItemEndpoint = () =>
  `/store-api/checkout/cart/line-item`;

/**
 * @public
 */
export const getCheckoutOrderEndpoint = () => `/store-api/checkout/order`;

/**
 * @public
 */
export const getCancelOrderEndpoint = () => `/store-api/order/state/cancel`;

/**
 * @public
 */
export const getChangeOrderPaymentMethodEndpoint = () =>
  `/store-api/order/payment`;

// context

/**
 * @public
 */
export const getContextEndpoint = () => `/store-api/context`;

/**
 * @public
 */
export const getContextCurrencyEndpoint = () => `/store-api/currency`;

/**
 * @public
 */
export const getContextLanguageEndpoint = () => `/store-api/language`;

/**
 * @public
 */
export const getContextCountryEndpoint = () => `/store-api/country`;

/**
 * @public
 */
export const getContextPaymentMethodEndpoint = () =>
  `/store-api/payment-method`;

/**
 * @public
 */
export const getContextShippingMethodEndpoint = () =>
  `/store-api/shipping-method`;

/**
 * @public
 */
export const getContextSalutationEndpoint = () => `/store-api/salutation`;

// newsletter

/**
 * @public
 */
export const getNewsletterSubscribeEndpoint = () => `/newsletter/subscribe`; // replace with `/store-api/v4/newsletter/subscribe`, consider using `/store-api/v4/newsletter/confirm`

/**
 * @public
 */
export const getNewsletterUnsubscribeEndpoint = () => `/newsletter/unsubscribe`; // replace with `/store-api/v4/newsletter/unsubscribe`

/**
 * @public
 */
export const getNewsletterRecipientEnpoint = () =>
  `/store-api/account/newsletter-recipient`;

/**
 * @public
 */
export const getPageResolverEndpoint = () => `/store-api/pwa/page`;

/**
 * @public
 */
export const getSeoUrlEndpoint = () => "/store-api/seo-url";

/**
 * @public
 */
export const getStoreNavigationEndpoint = (
  requestActiveId: string,
  requestRootId: string
) => `/store-api/navigation/${requestActiveId}/${requestRootId}`;

/**
 * @public
 */
export const getContactFormEndpoint = () => `/store-api/contact-form`;
/**
 * @public
 */
export const handlePaymentEndpoint = () => `/store-api/handle-payment`;

/**
 * @public
 */
export const getStoreNewsletterSubscribeEndpoint = () =>
  `/store-api/newsletter/subscribe`;

/**
 * @public
 */
export const getStoreNewsletterConfirmEndpoint = () =>
  `/store-api/newsletter/confirm`;

/**
 * @public
 */
export const getStoreNewsletterUnsubscribeEndpoint = () =>
  `/store-api/newsletter/unsubscribe`;

/**
 * @public
 */
export const getGetWishlistProductsEndpoint = () =>
  `/store-api/customer/wishlist`;
/**
 * @public
 */
export const getAddWishlistProductEndpoint = (productId: string) =>
  `/store-api/customer/wishlist/add/${productId}`;
/**
 * @public
 */
export const getRemoveWishlistProductEndpoint = (productId: string) =>
  `/store-api/customer/wishlist/delete/${productId}`;
/**
 * @public
 */
export const getMergeWishlistProductsEndpoint = () =>
  `/store-api/customer/wishlist/merge`;
/**
 * @public
 */
export const getCustomerDeleteEndpoint = () => `/store-api/account/customer`;
