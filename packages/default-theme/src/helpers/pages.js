export const PAGE_CHECKOUT = "/checkout"
export const PAGE_ACCOUNT = "/account/profile"
export const PAGE_LOGIN = "/login"
export const PAGE_SEARCH = "/search"
export const PAGE_ORDER_SUCCESS = "/order-success"
export const PAGE_ORDER_PAYMENT_FAILURE = "/payment-failure"
export const PAGE_WISHLIST = "/wishlist"
/**
 *
 * @param {vue-router Route} route
 * @returns
 */
export const isStaticPage = (route) => !route?.name?.startsWith("all")
