import { ref, Ref, computed } from "@vue/composition-api";
import {
  login as apiLogin,
  logout as apiLogout,
  getCustomer,
  getCustomerOrders,
  getCustomerOrderDetails,
  getCustomerAddresses
} from "@shopware-pwa/shopware-6-client";
import { Customer } from "packages/shopware-6-client/src/interfaces/models/checkout/customer/Customer";
import { getStore } from "@shopware-pwa/composables";
import { Order } from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/order/Order";
import { CustomerAddress } from "@shopware-pwa/shopware-6-client/src/interfaces/models/checkout/customer/CustomerAddress";

interface UseUser {
  login: ({
    username,
    password
  }: {
    username?: string;
    password?: string;
  }) => Promise<boolean>;
  user: Ref<Customer | null>;
  orders: Ref<Order[] | null>;
  loading: Ref<boolean>;
  error: Ref<any>;
  isLoggedIn: Ref<boolean>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  loadOrders: () => Promise<void>;
  getOrderDetails: (orderId: string) => Promise<Order>;
  getAddresses: () => Promise<CustomerAddress[]>;
}

export const useUser = (): UseUser => {
  let vuexStore = getStore();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const orders: Ref<Order[] | null> = ref(null);

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
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
      await refreshUser();
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiLogout();
    } catch (e) {
      error.value = e.message;
    } finally {
      await refreshUser();
    }
  };

  const refreshUser = async (): Promise<void> => {
    const user = await getCustomer();
    vuexStore.commit("SET_USER", user);
  };

  const loadOrders = async (): Promise<void> => {
    const fetchedOrders = await getCustomerOrders();
    orders.value = fetchedOrders;
  };

  const getOrderDetails = async (orderId: string): Promise<Order> => {
    return getCustomerOrderDetails(orderId);
  };

  const getAddresses = (): Promise<CustomerAddress[]> => getCustomerAddresses();

  const isLoggedIn = computed(() => !!user.value);

  return {
    login,
    user,
    error,
    loading,
    isLoggedIn,
    refreshUser,
    logout,
    orders,
    loadOrders,
    getOrderDetails,
    getAddresses
  };
};
