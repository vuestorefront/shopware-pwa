import { ref, Ref, computed } from "@vue/composition-api";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  updatePassword as apiUpdatePassword,
  updateEmail as apiUpdateEmail,
  getCustomer,
  getCustomerOrders,
  getCustomerOrderDetails,
  getCustomerAddresses,
  setDefaultCustomerBillingAddress,
  setDefaultCustomerShippingAddress,
  deleteCustomerAddress,
  createCustomerAddress,
  updateProfile,
  CustomerAddressParam,
  CustomerUpdateProfileParam,
  CustomerUpdatePasswordParam,
  CustomerUpdateEmailParam
} from "@shopware-pwa/shopware-6-client";
import { Customer } from "@shopware-pwa/commons/interfaces/models/checkout/customer/Customer";
import { getStore } from "@shopware-pwa/composables";
import { Order } from "@shopware-pwa/commons/interfaces/models/checkout/order/Order";
import {
  CustomerAddress,
  AddressType
} from "@shopware-pwa/commons/interfaces/models/checkout/customer/CustomerAddress";
import { CustomerRegistrationParams } from "@shopware-pwa/commons/interfaces/request/CustomerRegistrationParams";
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

/**
 * @alpha
 */
export interface UseUser {
  login: ({
    username,
    password
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
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  loadOrders: () => Promise<void>;
  getOrderDetails: (orderId: string) => Promise<Order>;
  loadAddresses: () => Promise<void>;
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
    type
  }: {
    addressId?: string;
    type?: AddressType;
  }) => Promise<string | boolean>;
}

/**
 * @alpha
 */
export const useUser = (): UseUser => {
  let vuexStore = getStore();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const orders: Ref<Order[] | null> = ref(null);
  const addresses: Ref<CustomerAddress[] | null> = ref(null);
  const user: any = computed(() => {
    return vuexStore.getters.getUser;
  });

  const login = async ({
    username,
    password
  }: { username?: string; password?: string } = {}): Promise<boolean> => {
    loading.value = true;
    error.value = null;
    try {
      await apiLogin({ username, password });
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
      await apiRegister(params);
      return true;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiLogout();
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    } finally {
      await refreshUser();
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const user = await getCustomer();
      vuexStore.commit("SET_USER", user);
    } catch (e) {
      console.error("useUser:refreshUser:getCustomer", e);
    }
  };

  const loadOrders = async (): Promise<void> => {
    const fetchedOrders = await getCustomerOrders();
    orders.value = fetchedOrders;
  };

  const getOrderDetails = async (orderId: string): Promise<Order> => {
    return getCustomerOrderDetails(orderId);
  };

  const loadAddresses = async (): Promise<void> => {
    try {
      addresses.value = await getCustomerAddresses();
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
    }
  };

  const markAddressAsDefault = async ({
    addressId,
    type
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
          await setDefaultCustomerBillingAddress(addressId);
          break;
        case AddressType.shipping:
          await setDefaultCustomerShippingAddress(addressId);
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

  const addAddress = async (params: CustomerAddressParam): Promise<boolean> => {
    try {
      await createCustomerAddress(params);
      return true;
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.message;
      return false;
    }
  };

  const deleteAddress = async (addressId: string): Promise<boolean> => {
    try {
      await deleteCustomerAddress(addressId);
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
      await updateProfile(personals);
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
      await apiUpdatePassword(updatePasswordData);
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
      await apiUpdateEmail(updateEmailData);
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
    addAddress,
    deleteAddress
  };
};
