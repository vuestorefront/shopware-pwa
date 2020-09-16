import { ref, Ref, computed } from "@vue/composition-api";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  updatePassword as apiUpdatePassword,
  resetPassword as apiResetPassword,
  updateEmail as apiUpdateEmail,
  getCustomer,
  getCustomerOrders,
  getCustomerOrderDetails,
  getCustomerAddresses,
  getUserCountry,
  getUserSalutation,
  setDefaultCustomerBillingAddress,
  setDefaultCustomerShippingAddress,
  deleteCustomerAddress,
  createCustomerAddress,
  updateProfile,
  CustomerUpdateProfileParam,
  CustomerUpdatePasswordParam,
  CustomerUpdateEmailParam,
  CustomerResetPasswordParam,
} from "@shopware-pwa/shopware-6-client";
import { Customer } from "@shopware-pwa/commons/interfaces/models/checkout/customer/Customer";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import {
  CustomerAddress,
  AddressType,
} from "@shopware-pwa/commons/interfaces/models/checkout/customer/CustomerAddress";
import { CustomerRegistrationParams } from "@shopware-pwa/commons/interfaces/request/CustomerRegistrationParams";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";
import { Country } from "@shopware-pwa/commons/interfaces/models/system/country/Country";
import { Salutation } from "@shopware-pwa/commons/interfaces/models/system/salutation/Salutation";
import { getApplicationContext } from "@shopware-pwa/composables";
import { ApplicationVueContext } from "../appContext";

/**
 * interface for {@link useUser} composable
 *
 * @beta
 */
export interface IUseUser {
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
  getOrderDetails: (orderId: string) => Promise<Order | undefined>;
  loadAddresses: () => Promise<void>;
  loadCountry: (countryId: string) => Promise<void>;
  loadSalutation: (salutationId: string) => Promise<void>;
  addAddress: (params: Partial<CustomerAddress>) => Promise<boolean>;
  deleteAddress: (addressId: string) => Promise<boolean>;
  updatePersonalInfo: (
    personals: CustomerUpdateProfileParam
  ) => Promise<boolean>;
  updateEmail: (updateEmailData: CustomerUpdateEmailParam) => Promise<boolean>;
  updatePassword: (
    updatePasswordData: CustomerUpdatePasswordParam
  ) => Promise<boolean>;
  resetPassword: (
    resetPasswordData: CustomerResetPasswordParam
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
 * Composable for user management. Options - {@link IUseUser}
 *
 * @beta
 */
export const useUser = (rootContext: ApplicationVueContext): IUseUser => {
  const { vuexStore, apiInstance } = getApplicationContext(
    rootContext,
    "useUser"
  );

  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const orders: Ref<Order[] | null> = ref(null);
  const addresses: Ref<CustomerAddress[] | null> = ref(null);
  const country: Ref<Country | null> = ref(null);
  const salutation: Ref<Salutation | null> = ref(null);
  const user: any = computed(() => {
    return vuexStore.getters.getUser;
  });

  const login = async ({
    username,
    password,
  }: { username?: string; password?: string } = {}): Promise<boolean> => {
    loading.value = true;
    error.value = null;
    try {
      await apiLogin({ username, password }, apiInstance);
      return true;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
      await refreshUser();
    }
  };

  const register = async (
    params: CustomerRegistrationParams
  ): Promise<boolean> => {
    loading.value = true;
    error.value = null;
    try {
      await apiRegister(params, apiInstance);
      return true;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiLogout(apiInstance);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    } finally {
      await refreshUser();
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const user = await getCustomer(apiInstance);
      vuexStore.commit("SET_USER", user);
    } catch (e) {
      console.error("useUser:refreshUser:getCustomer", e);
    }
  };

  const loadOrders = async (): Promise<void> => {
    const fetchedOrders = await getCustomerOrders(apiInstance);
    orders.value = fetchedOrders;
  };

  const getOrderDetails = async (orderId: string): Promise<Order | undefined> =>
    getCustomerOrderDetails(orderId, apiInstance);

  const loadAddresses = async (): Promise<void> => {
    try {
      addresses.value = await getCustomerAddresses(apiInstance);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    }
  };

  const loadCountry = async (userId: string): Promise<void> => {
    try {
      country.value = await getUserCountry(userId, apiInstance);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    }
  };

  const loadSalutation = async (salutationId: string): Promise<void> => {
    try {
      salutation.value = await getUserSalutation(salutationId, apiInstance);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    }
  };

  const markAddressAsDefault = async ({
    addressId,
    type,
  }: {
    addressId?: string;
    type?: AddressType;
  }): Promise<boolean> => {
    if (!addressId || !type) {
      return false;
    }

    try {
      switch (type) {
        case AddressType.billing:
          await setDefaultCustomerBillingAddress(addressId, apiInstance);
          break;
        case AddressType.shipping:
          await setDefaultCustomerShippingAddress(addressId, apiInstance);
          break;
        default:
          return false;
      }
      await refreshUser();
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
      return false;
    }

    return true;
  };

  const addAddress = async (
    params: Partial<CustomerAddress>
  ): Promise<boolean> => {
    try {
      await createCustomerAddress(params, apiInstance);
      return true;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
      return false;
    }
  };

  const deleteAddress = async (addressId: string): Promise<boolean> => {
    try {
      await deleteCustomerAddress(addressId, apiInstance);
      return true;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    }

    return false;
  };

  const updatePersonalInfo = async (
    personals: CustomerUpdateProfileParam
  ): Promise<boolean> => {
    try {
      await updateProfile(personals, apiInstance);
    } catch (e) {
      error.value = e;
      return false;
    }
    return true;
  };

  const updatePassword = async (
    updatePasswordData: CustomerUpdatePasswordParam
  ): Promise<boolean> => {
    try {
      await apiUpdatePassword(updatePasswordData, apiInstance);
    } catch (e) {
      error.value = e;
      return false;
    }
    return true;
  };

  const resetPassword = async (
    resetPasswordData: CustomerResetPasswordParam
  ): Promise<boolean> => {
    try {
      await apiResetPassword(resetPasswordData, apiInstance);
    } catch (e) {
      error.value = e;
      return false;
    }
    return true;
  };

  const updateEmail = async (
    updateEmailData: CustomerUpdateEmailParam
  ): Promise<boolean> => {
    try {
      await apiUpdateEmail(updateEmailData, apiInstance);
    } catch (e) {
      error.value = e;
      return false;
    }
    return true;
  };

  const isLoggedIn = computed(() => !!user.value?.id);

  return {
    login,
    register,
    user,
    error,
    loading,
    isLoggedIn,
    refreshUser,
    logout,
    orders,
    loadOrders,
    getOrderDetails,
    loadAddresses,
    addresses,
    markAddressAsDefault,
    updateEmail,
    updatePersonalInfo,
    updatePassword,
    resetPassword,
    addAddress,
    deleteAddress,
    loadSalutation,
    salutation,
    loadCountry,
    country,
  };
};
