import { ref, Ref, computed } from "@vue/composition-api";
import {
  login as apiLogin,
  logout as apiLogout,
  getCustomer
} from "@shopware-pwa/shopware-6-client";
import { Customer } from "packages/shopware-6-client/src/interfaces/models/checkout/customer/Customer";
import { getStore } from "@shopware-pwa/composables";

interface UseUser {
  login: ({
    username,
    password
  }: {
    username?: string;
    password?: string;
  }) => Promise<boolean>;
  user: Ref<Customer | null>;
  loading: Ref<boolean>;
  error: Ref<any>;
  isLoggedIn: Ref<boolean>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUser = (): UseUser => {
  let vuexStore = getStore();
  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);

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

  const isLoggedIn = computed(() => !!user.value);

  return {
    login,
    user,
    error,
    loading,
    isLoggedIn,
    refreshUser,
    logout
  };
};
