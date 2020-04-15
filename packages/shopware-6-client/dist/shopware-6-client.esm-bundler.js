import axios from "axios";
import https from "https";

const defaultConfig = {
  endpoint: "https://shopware-2.vuestorefront.io/sales-channel-api/v1",
  accessToken: "SWSCTXJOZMQWCXA4OUTNZ0REYG",
  contextToken: "",
  defaultPaginationLimit: 10,
  timeout: 3000,
};
let clientConfig = {};
const setupConfig = function (config = {}) {
  clientConfig = Object.assign(clientConfig, defaultConfig, config);
};
setupConfig();
const updateConfig = function (config) {
  clientConfig = Object.assign(clientConfig, config);
};
/**
 * @beta
 */
const config = clientConfig;

/**
 * http status codes thrown by API
 */
const API_ERROR_CODES = [400, 401, 403, 404, 409, 410, 412, 424, 500];
/**
 * @param {ShopwareApiError} error
 */
const extractApiErrorStatusCode = (error) => {
  return (
    (error.response && error.response.status) ||
    guessTheStatusCodeFromTheMessage(error.message)
  );
};
const guessTheStatusCodeFromTheMessage = (message) => {
  // catch the specific timeout rejection from axios
  if (typeof message == "string" && message.startsWith("timeout of")) {
    return 408;
  }
  return 500;
};
/**
 * Extract error message
 * Keep the original errors[] format if 400 Bad Request for validation purposes.
 * 400 responses always points to the specific field/param/option, thus should be kept entirely.
 *
 * @param {ShopwareApiError} error
 * @returns {(string|ShopwareError[])} single message if statusCode !== 400, array of native errors otherwise
 */
const extractApiErrorMessage = (error) => {
  var _a, _b, _c;
  const statusCode = extractApiErrorStatusCode(error);
  if (statusCode !== 400) {
    // Only Bad Request response has possibly more than one error object included.
    // Hide callstack in case of 500
    const apiError =
      statusCode === 500
        ? "Internal server error"
        : (_b =
            (_a = error.response.data) === null || _a === void 0
              ? void 0
              : _a.errors) === null || _b === void 0
        ? void 0
        : _b[0].detail;
    return apiError;
  }
  return (_c = error.response.data) === null || _c === void 0
    ? void 0
    : _c.errors;
};
/**
 * Extract message from AxiosError which comes from somewhere else.
 * @param {AxiosError} error
 * @returns {string}
 */
const extractNotApiErrorMessage = (error) => error.message;
/**
 * Extracts and create the consistent error object
 * Error message depends on:
 * 1. type of error (API or other network layer)
 * 2. status code
 *
 * @param {ShopwareApiError} error
 * @returns {Promise<ClientApiError>}
 */
async function errorInterceptor(error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const statusCode = extractApiErrorStatusCode(error);
  const clientApiError = {
    message: API_ERROR_CODES.includes(statusCode)
      ? extractApiErrorMessage(error)
      : extractNotApiErrorMessage(error),
    statusCode: statusCode,
  };
  return Promise.reject(clientApiError);
}

function responseInterceptor(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const contextToken =
    response.data["sw-context-token"] || response.headers["sw-context-token"];
  update({ contextToken });
  return response;
}

const apiService = axios.create({
  // temporary fix to prevent TLS issues
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
function reloadConfiguration() {
  apiService.defaults.baseURL = config.endpoint;
  apiService.defaults.timeout = config.timeout;
  apiService.defaults.headers.common["sw-access-key"] = config.accessToken;
  if (config.contextToken) {
    apiService.defaults.headers.common["sw-context-token"] =
      config.contextToken;
  } else {
    delete apiService.defaults.headers.common["sw-context-token"];
  }
}
reloadConfiguration();
apiService.interceptors.response.use(responseInterceptor, errorInterceptor);

// category
const getCategoryEndpoint = () => `/category`;
const getCategoryDetailsEndpoint = (categoryId) => `/category/${categoryId}`;
// product
const getProductEndpoint = () => `/product`;
const getProductDetailsEndpoint = (productId) => `/product/${productId}`;
const getProductsIdsEndpoint = () => `/search-ids/product`;
// customer
const getCustomerAddressEndpoint = (addressId) =>
  addressId ? `/customer/address/${addressId}` : "/customer/address";
const getCustomerDefaultAddressEndpoint = (type, addressId) =>
  `/customer/address/${addressId}/default-${type}`;
const getCustomerDefaultBillingAddressEndpoint = (addressId) =>
  getCustomerDefaultAddressEndpoint("billing", addressId);
const getCustomerDefaultShippingAddressEndpoint = (addressId) =>
  getCustomerDefaultAddressEndpoint("shipping", addressId);
const getCustomerEndpoint = () => `/customer`;
const getCustomerLoginEndpoint = () => `/customer/login`;
const getCustomerLogoutEndpoint = () => `/customer/logout`;
const getCustomerOrderEndpoint = () => `/customer/order`;
const getCustomerOrderDetailsEndpoint = (orderId) =>
  `/checkout/guest-order/${orderId}`;
const getCustomerUpdateEmailEndpoint = () => `/customer/email`;
const getCustomerUpdatePasswordEndpoint = () => `/customer/password`;
// checkout
const getCheckoutCartEndpoint = () => `/checkout/cart`;
const getCheckoutCartProductEndpoint = (productId) =>
  `/checkout/cart/product/${productId}`;
const getCheckoutCartLineItemEndpoint = (lineItemId) =>
  `/checkout/cart/line-item/${lineItemId}`;
const getCheckoutOrderEndpoint = () => `/checkout/order`;
const getCheckoutGuestOrderEndpoint = () => `/checkout/guest-order`;
const getCheckoutPromotionCodeEndpoint = (code) =>
  `/checkout/cart/code/${code}`;
// context
const getContextEndpoint = () => `/context`;
const getContextCurrencyEndpoint = () => `/currency`;
const getContextLanguageEndpoint = () => `/language`;
const getContextCountryEndpoint = () => `/country`;
const getContextCountryItemEndpoint = (countryId) => `/country/${countryId}`;
const getContextPaymentMethodEndpoint = () => `/payment-method`;
const getContextShippingMethodEndpoint = () => `/shipping-method`;
const getContextSalutationEndpoint = () => `/salutation`;
const getContextSalutationItemEndpoint = (salutationId) =>
  `/salutation/${salutationId}`;
const getPageResolverEndpoint = () => `/vsf/page`;
const getNavigationEndpoint = () => `/vsf/navigation`;

var SearchFilterType;
(function (SearchFilterType) {
  SearchFilterType["EQUALS"] = "equals";
  SearchFilterType["CONTAINS"] = "contains";
  SearchFilterType["EQUALS_ANY"] = "equalsAny";
  SearchFilterType["NOT"] = "not";
  SearchFilterType["MULTI"] = "multi";
  SearchFilterType["RANGE"] = "range";
})(SearchFilterType || (SearchFilterType = {}));

function convertAssociations(associations = []) {
  if (!Array.isArray(associations) || !associations.length) return;
  let shopwareAssociations = {};
  associations.forEach((association) => {
    shopwareAssociations[association.name] = association.associations
      ? {
          associations: convertAssociations(association.associations),
        }
      : {};
  });
  return shopwareAssociations;
}

var PaginationLimit;
(function (PaginationLimit) {
  PaginationLimit[(PaginationLimit["ONE"] = 1)] = "ONE";
  PaginationLimit[(PaginationLimit["FIVE"] = 5)] = "FIVE";
  PaginationLimit[(PaginationLimit["TEN"] = 10)] = "TEN";
  PaginationLimit[(PaginationLimit["TWENTY_FIVE"] = 25)] = "TWENTY_FIVE";
  PaginationLimit[(PaginationLimit["FIFTY"] = 50)] = "FIFTY";
  PaginationLimit[(PaginationLimit["SEVENTY_FIVE"] = 75)] = "SEVENTY_FIVE";
  PaginationLimit[(PaginationLimit["HUNDRED"] = 100)] = "HUNDRED";
  PaginationLimit[(PaginationLimit["FIVE_HUNDRED"] = 500)] = "FIVE_HUNDRED";
})(PaginationLimit || (PaginationLimit = {}));

const convertSearchCriteria = (searchCriteria) => {
  var _a;
  let params = {};
  if (!searchCriteria) return params;
  const { filters, sort, pagination, configuration, term } = searchCriteria;
  if (pagination) {
    const { limit, page } = pagination;
    if (limit && Object.values(PaginationLimit).includes(limit))
      params.limit = limit;
    if (page) {
      params.page = page;
      if (!params.limit) params.limit = config.defaultPaginationLimit;
    }
  }
  if (sort) {
    let prefix = sort.desc ? "-" : "";
    params.sort = `${prefix}${sort.field}`;
  }
  if (filters && filters.length) {
    params.filter = filters;
  }
  if (configuration && configuration.associations) {
    params.associations = convertAssociations(configuration.associations);
  }
  if ((_a = configuration) === null || _a === void 0 ? void 0 : _a.grouping) {
    params.grouping = configuration.grouping;
  }
  // fulltext query (works for every entity so can be global)
  if (term) {
    params.term = term;
  }
  // add extra grouping option and additional filter to prevent displaying redundand products.
  if (!configuration || (configuration && !configuration.displayParents)) {
    if (!Array.isArray(params.filter)) {
      params.filter = [];
    }
    params.grouping = {
      // prevent displaying parent instances of the product
      field: "displayGroup",
    };
    params.filter.push({
      type: SearchFilterType.NOT,
      queries: [
        {
          type: SearchFilterType.EQUALS,
          field: "displayGroup",
          value: null,
        },
      ],
    });
  }
  return params;
};

/**
 * @throws ClientApiError
 * @alpha
 */
async function getCategories(searchCriteria) {
  const resp = await apiService.post(
    getCategoryEndpoint(),
    convertSearchCriteria(searchCriteria)
  );
  return resp.data;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function getCategory(categoryId) {
  const resp = await apiService.get(getCategoryDetailsEndpoint(categoryId));
  return resp.data.data;
}

/**
 * Get default amount of products' ids
 *
 * @throws ClientApiError
 * @alpha
 */
const getProductsIds = async function () {
  const resp = await apiService.post(getProductsIdsEndpoint());
  return resp.data;
};
/**
 * Get default amount of products
 *
 * @throws ClientApiError
 * @alpha
 */
const getProducts = async function (searchCriteria) {
  const resp = await apiService.post(
    `${getProductEndpoint()}`,
    convertSearchCriteria(searchCriteria)
  );
  return resp.data;
};
/**
 * Get the product with passed productId
 *
 * @throws ClientApiError
 * @alpha
 */
async function getProduct(productId, params = null) {
  const resp = await apiService.get(getProductDetailsEndpoint(productId), {
    params,
  });
  return resp.data.data;
}

/**
 * Register a customer
 *
 * @throws ClientApiError
 * @alpha
 */
async function register(params) {
  const resp = await apiService.post(getCustomerEndpoint(), params);
  return resp.data;
}
/**
 * Get the context token for current user
 *
 * @throws ClientApiError
 * @alpha
 */
async function login({ username, password } = {}) {
  if (!username || !password)
    throw new Error("Provide username and password for login");
  const resp = await apiService.post(getCustomerLoginEndpoint(), {
    username,
    password,
  });
  const contextToken = resp.data["sw-context-token"];
  return { contextToken };
}
/**
 * End up the session
 *
 * @throws ClientApiError
 * @alpha
 */
async function logout() {
  await apiService.post(getCustomerLogoutEndpoint());
}
/**
 * Get customer's object
 *
 * @throws ClientApiError
 * @alpha
 */
async function getCustomer() {
  try {
    const resp = await apiService.get(getCustomerEndpoint());
    return resp.data.data;
  } catch (e) {
    if (e.statusCode === 403) return null;
    throw new Error("Unexpected getCustomerResponse.");
  }
}
/**
 * Get all customer's addresses
 *
 * @throws ClientApiError
 * @alpha
 */
async function getCustomerAddresses() {
  const resp = await apiService.get(getCustomerAddressEndpoint());
  return resp.data.data;
}
/**
 * Get all customer's orders
 *
 * @throws ClientApiError
 * @alpha
 */
async function getCustomerOrders() {
  const resp = await apiService.get(getCustomerOrderEndpoint());
  return resp.data.data;
}
/**
 * Get order details
 *
 * @throws ClientApiError
 * @alpha
 */
async function getCustomerOrderDetails(orderId) {
  const resp = await apiService.get(getCustomerOrderDetailsEndpoint(orderId));
  return resp.data.data;
}
/**
 * Get the customer's address by id
 *
 * @throws ClientApiError
 * @alpha
 */
async function getCustomerAddress(addressId) {
  const resp = await apiService.get(getCustomerAddressEndpoint(addressId));
  return resp.data.data;
}
/**
 * Create an address and respond the new address's id
 *
 * @throws ClientApiError
 * @alpha
 */
async function createCustomerAddress(params) {
  const resp = await apiService.post(getCustomerAddressEndpoint(), params);
  return resp.data;
}
/**
 * Delete's the customer's address by id
 *
 * @throws ClientApiError
 * @alpha
 */
async function deleteCustomerAddress(addressId) {
  await apiService.delete(getCustomerAddressEndpoint(addressId));
}
/**
 * Set address as default
 *
 * @throws ClientApiError
 * @alpha
 */
async function setDefaultCustomerBillingAddress(addressId) {
  const response = await apiService.patch(
    getCustomerDefaultBillingAddressEndpoint(addressId)
  );
  return response.data;
}
/**
 * Set address as default
 *
 * @throws ClientApiError
 * @alpha
 */
async function setDefaultCustomerShippingAddress(addressId) {
  const response = await apiService.patch(
    getCustomerDefaultShippingAddressEndpoint(addressId)
  );
  return response.data;
}
/**
 * Update a customer's email
 *
 * @throws ClientApiError
 * @alpha
 */
async function updateEmail(params) {
  await apiService.patch(getCustomerUpdateEmailEndpoint(), params);
}
/**
 * Update a customer's password
 *
 * @throws ClientApiError
 * @alpha
 */
async function updatePassword(params) {
  await apiService.patch(getCustomerUpdatePasswordEndpoint(), params);
}
/**
 * Update a customer's profile data
 *
 * @throws ClientApiError
 * @alpha
 */
async function updateProfile(params) {
  await apiService.patch(getCustomerEndpoint(), params);
}

/**
 * @throws ClientApiError
 * @alpha
 */
async function updateContext(params) {
  const resp = await apiService.patch(getContextEndpoint(), params);
  const contextToken = resp.data["sw-context-token"];
  return { contextToken };
}
/**
 * Loads session context, containing all session-related data.
 *
 * @throws ClientApiErrosr
 * @alpha
 */
async function getSessionContext() {
  const resp = await apiService.get(getContextEndpoint());
  return resp.data;
}
/**
 * Set the current session's shipping address to correspoding to id
 * @throws ClientApiError
 * @alpha
 */
function setCurrentShippingAddress(shippingAddressId) {
  return updateContext({ shippingAddressId });
}
/**
 * Set the current session's billing address to correspoding to id
 * @throws ClientApiError
 * @alpha
 */
function setCurrentBillingAddress(billingAddressId) {
  return updateContext({ billingAddressId });
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function getAvailableCurrencies() {
  const resp = await apiService.get(getContextCurrencyEndpoint());
  return resp.data;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function setCurrentCurrency(newCurrencyID) {
  let params = { currencyId: newCurrencyID };
  const resp = await updateContext(params);
  return resp;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function getAvailableLanguages() {
  const resp = await apiService.get(getContextLanguageEndpoint());
  return resp.data;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function setCurrentLanguage(newLanguageId) {
  let params = { languageId: newLanguageId };
  const resp = await updateContext(params);
  return resp;
}
/**
 * Get all available countries
 *
 * @throws ClientApiError
 * @alpha
 */
async function getAvailableCountries() {
  const resp = await apiService.get(getContextCountryEndpoint());
  return resp.data;
}
/**
 * Get all available salutations
 *
 * @throws ClientApiError
 * @alpha
 */
async function getAvailableSalutations() {
  const resp = await apiService.get(getContextSalutationEndpoint());
  return resp.data;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function getAvailablePaymentMethods() {
  const resp = await apiService.get(getContextPaymentMethodEndpoint());
  return resp.data;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function setCurrentPaymentMethod(newPaymentMethodId) {
  let params = { paymentMethodId: newPaymentMethodId };
  const resp = await updateContext(params);
  return resp;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function getAvailableShippingMethods() {
  const resp = await apiService.get(getContextShippingMethodEndpoint());
  return resp.data;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function setCurrentShippingMethod(newShippingMethodId) {
  let params = { shippingMethodId: newShippingMethodId };
  const resp = await updateContext(params);
  return resp;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function getUserCountry(countryId) {
  const { data } = await apiService.get(
    getContextCountryItemEndpoint(countryId)
  );
  return data;
}
/**
 * @throws ClientApiError
 * @alpha
 */
async function getUserSalutation(salutationId) {
  const { data } = await apiService.get(
    getContextSalutationItemEndpoint(salutationId)
  );
  return data;
}

var CartItemType;
(function (CartItemType) {
  CartItemType["PRODUCT"] = "product";
  CartItemType["CREDIT"] = "credit";
  CartItemType["CUSTOM"] = "custom";
  CartItemType["PROMOTION"] = "promotion";
})(CartItemType || (CartItemType = {}));

/**
 * When no sw-context-token given then this method return an empty cart with the new sw-context-token.
 *
 * When sw-context-token given then this method simply returns the current state of the cart.
 *
 * As the purpose of this method is not clear we recommend to use getCart() method because its behaviour seems to be the same.
 *
 * @throws ClientApiError
 *
 * @alpha
 */
async function clearCart() {
  const resp = await apiService.post(getCheckoutCartEndpoint());
  let contextToken = resp.data["sw-context-token"];
  return { contextToken };
}
/**
 * Gets the current cart for the sw-context-token.
 * @throws ClientApiError
 * @alpha
 */
async function getCart() {
  const resp = await apiService.get(getCheckoutCartEndpoint());
  return resp.data.data;
}
/**
 * Adds specific quantity of the product to the cart by productId. It creates a new cart line item.
 *
 * Warning: This method does not change the state of the cart in any way if productId already exists in a cart. For changing the quantity use addQuantityToCartLineItem() or changeCartLineItemQuantity() methods.
 *
 * @throws ClientApiError
 * @alpha
 */
async function addProductToCart(productId, quantity) {
  const qty = quantity || 1;
  const resp = await apiService.post(
    getCheckoutCartProductEndpoint(productId),
    { quantity: qty }
  );
  return resp.data.data;
}
/**
 * Increases the current quantity in specific cart line item by given quantity.
 *
 * Example: If current quantity is 3 and you pass 2 as quantity parameter, you will get a new cart's state with quantity 5.
 *
 * @throws ClientApiError
 * @alpha
 */
async function addCartItemQuantity(itemId, quantity) {
  let params = { type: CartItemType.PRODUCT, quantity: quantity };
  const resp = await apiService.post(
    getCheckoutCartLineItemEndpoint(itemId),
    params
  );
  return resp.data.data;
}
/**
 * Changes the current quantity in specific cart line item to given quantity.
 *
 * Example: If current quantity is 3 and you pass 2 as quantity parameter, you will get a new cart's state with quantity 2.
 *
 * @throws ClientApiError
 * @alpha
 */
async function changeCartItemQuantity(itemId, newQuantity = 1) {
  let params = { quantity: parseInt(newQuantity.toString()) };
  const resp = await apiService.patch(
    getCheckoutCartLineItemEndpoint(itemId),
    params
  );
  return resp.data.data;
}
/**
 * Deletes the cart line item by id.
 *
 * This method may be used for deleting "product" type item lines as well as "promotion" type item lines.
 *
 * @throws ClientApiError
 * @alpha
 */
async function removeCartItem(itemId) {
  const resp = await apiService.delete(getCheckoutCartLineItemEndpoint(itemId));
  return resp.data.data;
}
/**
 * Adds new promotion code to the cart by its code.
 *
 * Promotion code is being added as separate cart item line.
 *
 * @throws ClientApiError
 * @alpha
 */
async function addPromotionCode(promotionCode) {
  const resp = await apiService.post(
    getCheckoutPromotionCodeEndpoint(promotionCode)
  );
  return resp.data.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
async function getNavigation(params) {
  const resp = await apiService.post(getNavigationEndpoint(), params);
  return resp.data;
}

/**
 * @throws ClientApiError
 * @alpha
 */
async function getPage(path, searchCriteria) {
  const resp = await apiService.post(getPageResolverEndpoint(), {
    path: path,
    ...convertSearchCriteria(searchCriteria),
  });
  return resp.data;
}

/**
 * Creates an order for logged in users
 * @alpha
 */
async function createOrder() {
  var _a;
  const resp = await apiService.post(getCheckoutOrderEndpoint());
  return (_a = resp.data) === null || _a === void 0 ? void 0 : _a.data;
}
/**
 * Creates an order for not logged in users
 * Should be used when the user is logged out, but has items in the cart
 * @alpha
 */
async function createGuestOrder(params) {
  var _a;
  if (!params) {
    throw new Error("createGuestOrder method requires GuestOrderParams");
  }
  const resp = await apiService.post(getCheckoutGuestOrderEndpoint(), params);
  return (_a = resp.data) === null || _a === void 0 ? void 0 : _a.data;
}

/**
 * Setup configuration. Merge default values with provided in param.
 * This method will override existing config. For config update invoke **update** method.
 * @alpha
 */
function setup(config = {}) {
  setupConfig(config);
  reloadConfiguration();
}
/**
 * Update current configuration. This will change only provided values.
 * @alpha
 */
function update(config = {}) {
  updateConfig(config);
  reloadConfiguration();
  configChanged();
}
const callbackMethods = [];
/**
 * @alpha
 */
function onConfigChange(fn) {
  callbackMethods.push(fn);
}
function configChanged() {
  callbackMethods.forEach((fn) => fn({ config }));
}

export {
  addCartItemQuantity,
  addProductToCart,
  addPromotionCode,
  changeCartItemQuantity,
  clearCart,
  config,
  createCustomerAddress,
  createGuestOrder,
  createOrder,
  deleteCustomerAddress,
  getAvailableCountries,
  getAvailableCurrencies,
  getAvailableLanguages,
  getAvailablePaymentMethods,
  getAvailableSalutations,
  getAvailableShippingMethods,
  getCart,
  getCategories,
  getCategory,
  getCustomer,
  getCustomerAddress,
  getCustomerAddresses,
  getCustomerOrderDetails,
  getCustomerOrders,
  getNavigation,
  getPage,
  getProduct,
  getProducts,
  getProductsIds,
  getSessionContext,
  getUserCountry,
  getUserSalutation,
  login,
  logout,
  onConfigChange,
  register,
  removeCartItem,
  setCurrentBillingAddress,
  setCurrentCurrency,
  setCurrentLanguage,
  setCurrentPaymentMethod,
  setCurrentShippingAddress,
  setCurrentShippingMethod,
  setDefaultCustomerBillingAddress,
  setDefaultCustomerShippingAddress,
  setup,
  update,
  updateEmail,
  updatePassword,
  updateProfile,
};
