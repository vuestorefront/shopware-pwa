import { ref, Ref, UnwrapRef, computed, ComputedRef, reactive } from "vue-demi";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  updateEmail as apiUpdateEmail,
  getCustomer,
  getUserCountry,
  getUserSalutation,
  updateProfile,
  CustomerUpdateProfileParam,
  CustomerUpdateEmailParam,
  setDefaultCustomerPaymentMethod,
} from "@shopware-pwa/shopware-6-client";
import {
  Customer,
  CustomerRegistrationParams,
  ClientApiError,
  ShopwareError,
  Country,
  Salutation,
  ShopwareSearchParams,
} from "@shopware-pwa/commons/interfaces";
import {
  IInterceptorCallbackFunction,
  INTERCEPTOR_KEYS,
  useIntercept,
  useSharedState,
  useSessionContext,
  useCart,
  getApplicationContext,
  useDefaults,
} from "@shopware-pwa/composables";

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
  user: ComputedRef<Partial<Customer> | null>;
  loading: ComputedRef<boolean>;
  error: ComputedRef<any>;
  errors: UnwrapRef<{
    [errorAlias: string]: ShopwareError[];
  }>;
  isLoggedIn: ComputedRef<boolean>;
  isCustomerSession: ComputedRef<boolean>;
  isGuestSession: ComputedRef<boolean>;
  country: Ref<Country | null>;
  salutation: Ref<Salutation | null>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  loadCountry: (countryId: string) => Promise<void>;
  loadSalutation: (salutationId: string) => Promise<void>;
  updatePersonalInfo: (
    personals: CustomerUpdateProfileParam
  ) => Promise<boolean>;
  updateEmail: (updateEmailData: CustomerUpdateEmailParam) => Promise<boolean>;
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<void>;
  /**
   * React on user logout
   */
  onLogout: (fn: () => void) => void;
  onUserLogin: (fn: (params: { customer: Customer }) => void) => void;
  onUserRegister: (fn: () => void) => void;
}

/**
 * Composable for user management. Options - {@link IUseUser}
 *
 * @beta
 */
export function useUser(): IUseUser {
  const COMPOSABLE_NAME = "useUser";
  const contextName = COMPOSABLE_NAME;

  const { apiInstance } = getApplicationContext({ contextName });
  const { broadcast, intercept } = useIntercept();
  const { refreshSessionContext } = useSessionContext();
  const { refreshCart } = useCart();
  const { getDefaults } = useDefaults({ defaultsKey: contextName });

  const { sharedRef } = useSharedState();
  const storeUser = sharedRef<Partial<Customer>>(`${contextName}-user`);

  const loading: Ref<boolean> = ref(false);
  const error: Ref<any> = ref(null);
  const errors: UnwrapRef<{
    [errorAlias: string]: ShopwareError[];
  }> = reactive({
    login: [],
    register: [],
    resetPassword: [],
    updatePassword: [],
    updateEmail: [],
    setDefaultPaymentMethod: [],
  });

  const country: Ref<Country | null> = ref(null);
  const salutation: Ref<Salutation | null> = ref(null);
  const user = computed(() => storeUser.value);

  async function login({
    username,
    password,
  }: { username?: string; password?: string } = {}): Promise<boolean> {
    loading.value = true;
    error.value = null;
    errors.login = [] as any;
    try {
      await apiLogin({ username, password }, apiInstance);
      await refreshUser();
      broadcast(INTERCEPTOR_KEYS.USER_LOGIN, {
        user: user.value,
      });
      return true;
    } catch (e) {
      const err: ClientApiError = e;
      errors.login = err.messages;
      broadcast(INTERCEPTOR_KEYS.ERROR, {
        methodName: `[${contextName}][login]`,
        inputParams: {},
        error: err,
      });
      return false;
    } finally {
      loading.value = false;
      await refreshUser();
      refreshCart();
    }
  }

  async function register(
    params: CustomerRegistrationParams
  ): Promise<boolean> {
    loading.value = true;
    errors.register = [];
    try {
      const customer = await apiRegister(params, apiInstance);
      broadcast(INTERCEPTOR_KEYS.USER_REGISTER, { customer });
      storeUser.value = customer || {};
      refreshSessionContext();
      return true;
    } catch (e) {
      const err: ClientApiError = e;
      // temporary workaround - get rid of such hacks in the future
      // TODO: https://github.com/vuestorefront/shopware-pwa/issues/1498
      errors.register = err.messages;
      broadcast(INTERCEPTOR_KEYS.ERROR, {
        methodName: `[${contextName}][register]`,
        inputParams: {},
        error: err,
      });
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function logout(): Promise<void> {
    try {
      await apiLogout(apiInstance);
      broadcast(INTERCEPTOR_KEYS.USER_LOGOUT);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.messages;
      broadcast(INTERCEPTOR_KEYS.ERROR, {
        methodName: `[${contextName}][logout]`,
        inputParams: {},
        error: err,
      });
    } finally {
      await refreshUser();
      refreshCart();
    }
  }
  const onLogout = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.USER_LOGOUT, fn);

  const onUserLogin = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.USER_LOGIN, fn);

  const onUserRegister = (fn: IInterceptorCallbackFunction) =>
    intercept(INTERCEPTOR_KEYS.USER_REGISTER, fn);

  async function refreshUser(params: ShopwareSearchParams = {}): Promise<void> {
    try {
      const user = await getCustomer(
        Object.assign({}, getDefaults(), params),
        apiInstance
      );
      storeUser.value = user || {};
    } catch (e) {
      storeUser.value = {};
      console.error("[useUser][refreshUser]", e);
    }
  }

  async function loadCountry(userId: string): Promise<void> {
    try {
      country.value = await getUserCountry(userId, apiInstance);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.messages;
    }
  }

  async function loadSalutation(salutationId: string): Promise<void> {
    try {
      salutation.value = await getUserSalutation(salutationId, apiInstance);
    } catch (e) {
      const err: ClientApiError = e;
      error.value = err.messages;
    }
  }

  async function updatePersonalInfo(
    personals: CustomerUpdateProfileParam
  ): Promise<boolean> {
    try {
      await updateProfile(personals, apiInstance);
    } catch (e) {
      error.value = e;
      return false;
    }
    return true;
  }

  async function updateEmail(
    updateEmailData: CustomerUpdateEmailParam
  ): Promise<boolean> {
    errors.updateEmail = [];
    try {
      await apiUpdateEmail(updateEmailData, apiInstance);
    } catch (e) {
      errors.updateEmail = e.messages;
      return false;
    }
    return true;
  }

  async function setDefaultPaymentMethod(
    paymentMethodId: string
  ): Promise<void> {
    try {
      await setDefaultCustomerPaymentMethod(paymentMethodId);
    } catch (error) {
      errors.setDefaultPaymentMethod = error.messages;
    }
  }

  const isLoggedIn = computed(() => !!user.value?.id && !!user.value.active);
  const isCustomerSession = computed(
    () => !!user.value?.id && !user.value.guest
  );
  const isGuestSession = computed(() => !!user.value?.guest);

  return {
    login,
    register,
    user,
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    isLoggedIn,
    isCustomerSession,
    isGuestSession,
    refreshUser,
    logout,
    updateEmail,
    updatePersonalInfo,
    setDefaultPaymentMethod,
    loadSalutation,
    salutation,
    loadCountry,
    country,
    errors,
    onLogout,
    onUserLogin,
    onUserRegister,
  };
}
