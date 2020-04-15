import { Cart } from "@shopware-pwa/commons/interfaces/models/checkout/cart/Cart";
import { Category } from "@shopware-pwa/commons/interfaces/models/content/category/Category";
import { CmsPage } from "@shopware-pwa/commons/interfaces/models/content/cms/CmsPage";
import { ContextTokenResponse } from "@shopware-pwa/commons/interfaces/response/SessionContext";
import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";
import { Currency } from "@shopware-pwa/commons/interfaces/models/system/currency/Currency";
import { Customer } from "@shopware-pwa/commons/interfaces/models/checkout/customer/Customer";
import { CustomerAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/CustomerAddress";
import { CustomerRegistrationParams } from "@shopware-pwa/commons/interfaces/request/CustomerRegistrationParams";
import { EqualsAnyFilter } from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { EqualsFilter } from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { Grouping } from "@shopware-pwa/commons/interfaces/search/Grouping";
import { GuestOrderParams } from "@shopware-pwa/commons/interfaces/request/GuestOrderParams";
import { Language } from "@shopware-pwa/commons/interfaces/models/framework/language/Language";
import { MultiFilter } from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { NavigationResponse } from "@shopware-pwa/commons/interfaces/models/content/navigation/Navigation";
import { NotFilter } from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { RangeFilter } from "@shopware-pwa/commons/interfaces/search/SearchFilter";
import { Salutation } from "@shopware-pwa/commons/interfaces/models/system/salutation/Salutation";
import { SearchCriteria } from "@shopware-pwa/commons/interfaces/search/SearchCriteria";
import { SearchResult } from "@shopware-pwa/commons/interfaces/response/SearchResult";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";
import { ShopwareAssociation } from "@shopware-pwa/commons/interfaces/search/Association";

/**
 * Increases the current quantity in specific cart line item by given quantity.
 *
 * Example: If current quantity is 3 and you pass 2 as quantity parameter, you will get a new cart's state with quantity 5.
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function addCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<Cart>;

/**
 * Adds specific quantity of the product to the cart by productId. It creates a new cart line item.
 *
 * Warning: This method does not change the state of the cart in any way if productId already exists in a cart. For changing the quantity use addQuantityToCartLineItem() or changeCartLineItemQuantity() methods.
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function addProductToCart(
  productId: string,
  quantity: number
): Promise<Cart>;

/**
 * Adds new promotion code to the cart by its code.
 *
 * Promotion code is being added as separate cart item line.
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function addPromotionCode(promotionCode: string): Promise<Cart>;

/**
 * Changes the current quantity in specific cart line item to given quantity.
 *
 * Example: If current quantity is 3 and you pass 2 as quantity parameter, you will get a new cart's state with quantity 2.
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function changeCartItemQuantity(
  itemId: string,
  newQuantity?: number
): Promise<Cart>;

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
export declare function clearCart(): Promise<ContextTokenResponse>;

/**
 * @alpha
 */
declare interface ClientSettings {
  endpoint?: string;
  accessToken?: string;
  contextToken?: string;
  defaultPaginationLimit?: number;
  timeout?: number;
}

/**
 * @beta
 */
export declare const config: ClientSettings;

/**
 * @alpha
 */
export declare interface ConfigChangedArgs {
  config: ClientSettings;
}

/**
 * Create an address and respond the new address's id
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function createCustomerAddress(
  params: CustomerAddressParam
): Promise<string>;

/**
 * Creates an order for not logged in users
 * Should be used when the user is logged out, but has items in the cart
 * @alpha
 */
export declare function createGuestOrder(
  params: GuestOrderParams
): Promise<Order>;

/**
 * Creates an order for logged in users
 * @alpha
 */
export declare function createOrder(): Promise<Order>;

/**
 * @alpha
 */
export declare interface CustomerAddressParam
  extends Partial<CustomerAddress> {}

/**
 * @alpha
 */
export declare interface CustomerRegisterResponse {
  data: string;
}

/**
 * @alpha
 */
export declare interface CustomerUpdateEmailParam {
  email: string;
  emailConfirmation: string;
  password: string;
}

/**
 * @alpha
 */
export declare interface CustomerUpdatePasswordParam {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

/**
 * @alpha
 */
export declare interface CustomerUpdateProfileParam {
  firstName: string;
  lastName: string;
  salutationId: string;
  title: string | null;
}

/**
 * Delete's the customer's address by id
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function deleteCustomerAddress(addressId: string): Promise<void>;

/**
 * Get all available countries
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function getAvailableCountries(): Promise<
  SearchResult<Country[]>
>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getAvailableCurrencies(): Promise<
  SearchResult<Currency[]>
>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getAvailableLanguages(): Promise<
  SearchResult<Language[]>
>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getAvailablePaymentMethods(): Promise<
  SearchResult<PaymentMethod[]>
>;

/**
 * Get all available salutations
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function getAvailableSalutations(): Promise<
  SearchResult<Salutation[]>
>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getAvailableShippingMethods(): Promise<
  SearchResult<ShippingMethod[]>
>;

/**
 * Gets the current cart for the sw-context-token.
 * @throws ClientApiError
 * @alpha
 */
export declare function getCart(): Promise<Cart>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getCategories(
  searchCriteria?: SearchCriteria
): Promise<SearchResult<Category[]>>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getCategory(categoryId: string): Promise<Category>;

/**
 * Get customer's object
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function getCustomer(): Promise<Customer | null>;

/**
 * Get the customer's address by id
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function getCustomerAddress(
  addressId: string
): Promise<CustomerAddress>;

/**
 * Get all customer's addresses
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function getCustomerAddresses(): Promise<CustomerAddress[]>;

/**
 * Get order details
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function getCustomerOrderDetails(
  orderId: string
): Promise<Order>;

/**
 * Get all customer's orders
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function getCustomerOrders(): Promise<Order[]>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getNavigation(
  params: GetNavigationParams
): Promise<NavigationResponse>;

/**
 * @alpha
 */
export declare interface GetNavigationParams {
  depth: number;
  rootNode?: string;
}

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getPage(
  path: string,
  searchCriteria?: SearchCriteria
): Promise<PageResolverResult<CmsPage>>;

/**
 * Get the product with passed productId
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function getProduct(
  productId: string,
  params?: any
): Promise<Product>;

/**
 * Get default amount of products
 *
 * @throws ClientApiError
 * @alpha
 */
export declare const getProducts: (
  searchCriteria?: SearchCriteria | undefined
) => Promise<SearchResult<Product[]>>;

/**
 * Get default amount of products' ids
 *
 * @throws ClientApiError
 * @alpha
 */
export declare const getProductsIds: () => Promise<SearchResult<string[]>>;

/**
 * Loads session context, containing all session-related data.
 *
 * @throws ClientApiErrosr
 * @alpha
 */
export declare function getSessionContext(): Promise<SessionContext>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getUserCountry(countryId: string): Promise<Country>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function getUserSalutation(
  salutationId: string
): Promise<Salutation>;

/**
 * Get the context token for current user
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function login({
  username,
  password,
}?: {
  username?: string;
  password?: string;
}): Promise<ContextTokenResponse>;

/**
 * End up the session
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function logout(): Promise<void>;

/**
 * @alpha
 */
export declare function onConfigChange(
  fn: (context: ConfigChangedArgs) => void
): void;

/**
 * @alpha
 */
export declare interface PageResolverResult<T> {
  breadcrumb: any[];
  resourceType: string;
  resourceIdentifier: string;
  cmsPage: T;
}

/**
 * Register a customer
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function register(
  params: CustomerRegistrationParams
): Promise<CustomerRegisterResponse>;

/**
 * Deletes the cart line item by id.
 *
 * This method may be used for deleting "product" type item lines as well as "promotion" type item lines.
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function removeCartItem(itemId: string): Promise<Cart>;

/**
 * Set the current session's billing address to correspoding to id
 * @throws ClientApiError
 * @alpha
 */
export declare function setCurrentBillingAddress(
  billingAddressId: string
): Promise<ContextTokenResponse>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function setCurrentCurrency(
  newCurrencyID: string
): Promise<ContextTokenResponse>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function setCurrentLanguage(
  newLanguageId: string
): Promise<ContextTokenResponse>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function setCurrentPaymentMethod(
  newPaymentMethodId: string
): Promise<ContextTokenResponse>;

/**
 * Set the current session's shipping address to correspoding to id
 * @throws ClientApiError
 * @alpha
 */
export declare function setCurrentShippingAddress(
  shippingAddressId: string
): Promise<ContextTokenResponse>;

/**
 * @throws ClientApiError
 * @alpha
 */
export declare function setCurrentShippingMethod(
  newShippingMethodId: string
): Promise<ContextTokenResponse>;

/**
 * Set address as default
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function setDefaultCustomerBillingAddress(
  addressId: string
): Promise<string>;

/**
 * Set address as default
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function setDefaultCustomerShippingAddress(
  addressId: string
): Promise<string>;

/**
 * Setup configuration. Merge default values with provided in param.
 * This method will override existing config. For config update invoke **update** method.
 * @alpha
 */
export declare function setup(config?: ClientSettings): void;

/**
 * @alpha
 */
export declare interface ShopwareParams {
  page?: number;
  limit?: number;
  sort?: string;
  term?: string;
  filter?: (
    | NotFilter
    | MultiFilter
    | EqualsFilter
    | EqualsAnyFilter
    | RangeFilter
  )[];
  associations?: ShopwareAssociation;
  grouping?: Grouping;
}

/**
 * Update current configuration. This will change only provided values.
 * @alpha
 */
export declare function update(config?: ClientSettings): void;

/**
 * Update a customer's email
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function updateEmail(
  params: CustomerUpdateEmailParam
): Promise<void>;

/**
 * Update a customer's password
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function updatePassword(
  params: CustomerUpdatePasswordParam
): Promise<void>;

/**
 * Update a customer's profile data
 *
 * @throws ClientApiError
 * @alpha
 */
export declare function updateProfile(
  params: CustomerUpdateProfileParam
): Promise<void>;

export {};
