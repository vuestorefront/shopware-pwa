import { AddressType } from "@shopware-pwa/commons/interfaces/models/checkout/customer/CustomerAddress";
import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";
import { Customer } from "@shopware-pwa/commons/interfaces/models/checkout/customer/Customer";
import { CustomerAddress } from "@shopware-pwa/commons/interfaces/models/checkout/customer/CustomerAddress";
import { CustomerAddressParam } from "@shopware-pwa/shopware-6-client";
import { CustomerRegistrationParams } from "@shopware-pwa/commons/interfaces/request/CustomerRegistrationParams";
import { CustomerUpdateEmailParam } from "@shopware-pwa/shopware-6-client";
import { CustomerUpdatePasswordParam } from "@shopware-pwa/shopware-6-client";
import { CustomerUpdateProfileParam } from "@shopware-pwa/shopware-6-client";
import { GuestOrderParams } from "@shopware-pwa/commons/interfaces/request/GuestOrderParams";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import { PaymentMethod } from "@shopware-pwa/commons/interfaces/models/checkout/payment/PaymentMethod";
import { Product } from "@shopware-pwa/commons/interfaces/models/content/product/Product";
import { Ref } from "@vue/composition-api";
import { Salutation } from "@shopware-pwa/commons/interfaces/models/system/salutation/Salutation";
import { SessionContext } from "@shopware-pwa/commons/interfaces/response/SessionContext";
import { ShippingMethod } from "@shopware-pwa/commons/interfaces/models/checkout/shipping/ShippingMethod";

/**
 * @alpha
 */
export declare interface CheckoutStepFields {
  [property: string]: unknown;
}

/**
 * @alpha
 */
export declare interface CreateCheckoutStep {
  isValid: Readonly<Ref<boolean>>;
  validations: Readonly<Ref<Readonly<VuelidateValidation> | null>>;
  setValidations: ($v: VuelidateValidation) => void;
  validate: () => void;
  [property: string]: any;
}

/**
 * @alpha
 */
export declare function createCheckoutStep({
  stepNumber,
  stepFields,
  stepDataUpdated,
}: {
  stepNumber: number;
  stepFields: CheckoutStepFields;
  stepDataUpdated: (updatedData: CheckoutStepFields) => void;
}): () => CreateCheckoutStep;

/**
 * @alpha
 */
export declare function getStore(): any;

/**
 * @alpha
 */
export declare type Search = (path: string, associations?: any) => any;

/**
 * @alpha
 */
export declare function setStore(ref: any): void;

/**
 * @alpha
 */
export declare interface UseAddToCart {
  addToCart: () => Promise<void>;
  quantity: Ref<number>;
  loading: Ref<boolean>;
  error: Ref<any>;
  getStock: Ref<number | null>;
  isInCart: Ref<boolean>;
}

/**
 * @alpha
 */
export declare const useAddToCart: (product: Product) => UseAddToCart;

/**
 * @alpha
 */
export declare const useCart: () => any;

/**
 * @alpha
 */
export declare const useCartSidebar: () => any;

/**
 * @alpha
 */
export declare const useCategoryFilters: () => any;

/**
 * @alpha
 */
export declare interface UseCheckout {
  isGuestOrder: Readonly<Ref<boolean>>;
  guestOrderParams: Ref<Readonly<Partial<GuestOrderParams | null>>>;
  getShippingMethods: (options?: {
    forceReload: boolean;
  }) => Promise<Readonly<Ref<readonly ShippingMethod[]>>>;
  getPaymentMethods: (options?: {
    forceReload: boolean;
  }) => Promise<Readonly<Ref<readonly PaymentMethod[]>>>;
  createOrder: () => Promise<Order>;
  updateGuestOrderParams: (params: Partial<GuestOrderParams>) => void;
}

/**
 * @alpha
 */
export declare const useCheckout: () => UseCheckout;

/**
 * @alpha
 */
export declare const useCms: () => any;

/**
 * @alpha
 */
export declare interface UseCountries {
  mountedCallback: () => Promise<void>;
  getCountries: Ref<Readonly<any>>;
  fetchCountries: () => Promise<void>;
  error: Ref<any>;
}

/**
 * @alpha
 */
export declare const useCountries: () => UseCountries;

/**
 * @alpha
 */
export declare const useNavigation: () => any;

/**
 * @alpha
 */
export declare interface UseProduct<PRODUCT, SEARCH> {
  product: Ref<PRODUCT>;
  search: SEARCH;
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

/**
 * @alpha
 */
export declare const useProduct: (
  loadedProduct?: any
) => UseProduct<Product, Search>;

/**
 * @alpha
 */
export declare interface UseProductListing {
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

/**
 * @alpha
 */
export declare const useProductListing: (
  initialProducts?: Product[]
) => UseProductListing;

/**
 * @alpha
 */
export declare interface UseProductSearch {
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

/**
 * @alpha
 */
export declare const useProductSearch: () => UseProductSearch;

/**
 * @alpha
 */
export declare interface UseSalutations {
  mountedCallback: () => Promise<void>;
  getSalutations: Ref<Readonly<any>>;
  fetchSalutations: () => Promise<void>;
  error: Ref<any>;
}

/**
 * @alpha
 */
export declare const useSalutations: () => UseSalutations;

/**
 * Simple session management.
 * SessionContext contain all related data like user, currency, country, shippingMethod, paymentMethod etc.
 * @alpha
 */
export declare interface UseSessionContext {
  sessionContext: Readonly<Ref<SessionContext | null>>;
  refreshSessionContext: () => Promise<void>;
  shippingMethod: Readonly<Ref<ShippingMethod>>;
  setShippingMethod: (shippingMethod: Partial<ShippingMethod>) => Promise<void>;
}

/**
 * @alpha
 */
export declare const useSessionContext: () => UseSessionContext;

/**
 * @alpha
 */
export declare interface UseUser {
  login: ({
    username,
    password,
  }: {
    username?: string;
    password?: string;
  }) => Promise<boolean>;
  register: ({}: CustomerRegistrationParams) => Promise<boolean>;
  user: Ref<Customer | null>;
  orders: Ref<Order[] | null>;
  addresses: Ref<CustomerAddress[] | null>;
  loading: Ref<boolean>;
  error: Ref<any>;
  isLoggedIn: Ref<boolean>;
  country: Ref<Country | null>;
  salutation: Ref<Salutation | null>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  loadOrders: () => Promise<void>;
  getOrderDetails: (orderId: string) => Promise<Order>;
  loadAddresses: () => Promise<void>;
  loadCountry: (countryId: string) => Promise<void>;
  loadSalutation: (salutationId: string) => Promise<void>;
  addAddress: (params: CustomerAddressParam) => Promise<boolean>;
  deleteAddress: (addressId: string) => Promise<boolean>;
  updatePersonalInfo: (
    personals: CustomerUpdateProfileParam
  ) => Promise<boolean>;
  updateEmail: (updateEmailData: CustomerUpdateEmailParam) => Promise<boolean>;
  updatePassword: (
    updatePasswordData: CustomerUpdatePasswordParam
  ) => Promise<boolean>;
  markAddressAsDefault: ({
    addressId,
    type,
  }: {
    addressId?: string;
    type?: AddressType;
  }) => Promise<string | boolean>;
}

/**
 * @alpha
 */
export declare const useUser: () => UseUser;

/**
 * @alpha
 */
export declare const useUserLoginModal: () => any;

/**
 * @alpha
 */
export declare interface VuelidateValidation {
  $invalid: boolean;
  $touch: () => void;
}

export {};
