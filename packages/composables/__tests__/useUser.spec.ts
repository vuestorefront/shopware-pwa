import Vue from "vue";
import VueCompositionApi, {
  Ref,
  ref,
  reactive,
  computed
} from "@vue/composition-api";
Vue.use(VueCompositionApi);

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useUser, setStore } from "@shopware-pwa/composables";

describe("Composables - useUser", () => {
  const stateUser: Ref<Object | null> = ref(null);
  beforeEach(() => {
    // mock vuex store
    jest.resetAllMocks();
    stateUser.value = null;
    setStore({
      getters: reactive({ getUser: computed(() => stateUser.value) }),
      commit: (name: string, value: any) => {
        stateUser.value = value;
      }
    });
  });

  describe("computed", () => {
    describe("user", () => {
      it("should return null when no user", () => {
        const { user } = useUser();
        expect(user.value).toBeNull();
      });

      it("should return a proper user object", () => {
        stateUser.value = { id: "111" };
        const { user } = useUser();
        expect(user.value).toEqual({ id: "111" });
      });
    });

    describe("isLoggedIn", () => {
      it("should return false when no user is set", () => {
        const { isLoggedIn } = useUser();
        expect(isLoggedIn.value).toEqual(false);
      });

      it("should return true when user obnject is set", () => {
        stateUser.value = { id: "111" };
        const { isLoggedIn } = useUser();
        expect(isLoggedIn.value).toEqual(true);
      });
    });
  });

  describe("methods", () => {
    describe("refreshUser", () => {
      it("should get an empty customer when user is not logged in", async () => {
        mockedApiClient.getCustomer.mockResolvedValueOnce(null);
        const { user, refreshUser } = useUser();
        await refreshUser();
        expect(user.value).toEqual(null);
      });

      it("should get a customer when user is logged in", async () => {
        mockedApiClient.getCustomer.mockResolvedValueOnce({ id: "123" } as any);
        const { user, refreshUser } = useUser();
        await refreshUser();
        expect(user.value).toEqual({ id: "123" });
      });
    });

    describe("login", () => {
      it("should not login user without credentials", async () => {
        mockedApiClient.login.mockRejectedValueOnce(
          new Error("Provide username and password for login")
        );
        const { isLoggedIn, error, login } = useUser();
        const result = await login(undefined as any);
        expect(result).toEqual(false);
        expect(isLoggedIn.value).toBeFalsy();
        expect(error.value).toEqual("Provide username and password for login");
      });

      it("should not login user with bad credentials", async () => {
        mockedApiClient.login.mockRejectedValueOnce(
          new Error("Bad user credentials")
        );
        const { isLoggedIn, error, login } = useUser();
        const result = await login({
          username: "qwe@qwe.com",
          password: "fakePassword"
        });
        expect(result).toEqual(false);
        expect(isLoggedIn.value).toBeFalsy();
        expect(error.value).toEqual("Bad user credentials");
      });

      it("should login user succesfully", async () => {
        mockedApiClient.login.mockResolvedValueOnce({
          "sw-context-token": "qweqwe"
        } as any);
        mockedApiClient.getCustomer.mockResolvedValueOnce({ id: "123" } as any);
        const { isLoggedIn, error, login } = useUser();
        const result = await login({
          username: "qwe@qwe.com",
          password: "correctPassword"
        });
        expect(result).toEqual(true);
        expect(isLoggedIn.value).toBeTruthy();
        expect(error.value).toBeFalsy();
      });
    });

    describe("logout", () => {
      it("should correctly logout user", async () => {
        stateUser.value = { id: "111" };
        mockedApiClient.logout.mockResolvedValueOnce({
          "sw-context-token": "qweqwe"
        } as any);
        mockedApiClient.getCustomer.mockResolvedValueOnce(null as any);
        const { isLoggedIn, error, logout } = useUser();
        expect(isLoggedIn.value).toBeTruthy();
        await logout();
        expect(isLoggedIn.value).toBeFalsy();
        expect(error.value).toBeFalsy();
      });

      it("should show an error when user is not logged out", async () => {
        stateUser.value = { id: "111" };
        mockedApiClient.logout.mockRejectedValueOnce(
          new Error("Something wrong with logout")
        );
        mockedApiClient.getCustomer.mockResolvedValueOnce({ id: "111" } as any);
        const { isLoggedIn, error, logout } = useUser();
        expect(isLoggedIn.value).toBeTruthy();
        await logout();
        expect(isLoggedIn.value).toBeTruthy();
        expect(error.value).toEqual("Something wrong with logout");
      });
    });

    describe("loadOrders", () => {
      it("should load customer's orders from different endpoint", async () => {
        const ordersResponse = [
          {
            id: "12345",
            orderNumber: "100123"
          }
        ];
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        const { orders, loadOrders } = useUser();
        expect(orders.value).toBeNull();
        await loadOrders();
        expect(orders.value).toHaveLength(1);
      });
    });

    describe("getOrderDetails", () => {
      it("should return order details for given orderId", async () => {
        const orderResponse = {
          id: "12345",
          orderNumber: "100123"
        };
        mockedApiClient.getCustomerOrderDetails.mockResolvedValueOnce(
          orderResponse as any
        );
        const { getOrderDetails } = useUser();
        const orderDetails = await getOrderDetails("12345");
        expect(orderDetails).toBe(orderResponse);
      });
    });
  });
});
