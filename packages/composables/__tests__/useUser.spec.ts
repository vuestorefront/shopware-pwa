import Vue from "vue";
import VueCompositionApi, {
  Ref,
  ref,
  reactive,
  computed,
} from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { ClientApiError } from "@shopware-pwa/commons/interfaces/errors/ApiError";

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");

const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import { useUser } from "@shopware-pwa/composables";

describe("Composables - useUser", () => {
  const stateUser: Ref<Object | null> = ref(null);
  const rootContextMock: any = {
    $store: {
      getters: reactive({ getUser: computed(() => stateUser.value) }),
      commit: (name: string, value: any) => {
        stateUser.value = value;
      },
    },
    $shopwareApiInstance: jest.fn(),
  };
  beforeEach(() => {
    jest.resetAllMocks();
    stateUser.value = null;
  });

  describe("computed", () => {
    describe("user", () => {
      it("should return null when no user", () => {
        const { user } = useUser(rootContextMock);
        expect(user.value).toBeNull();
      });

      it("should return a proper user object", () => {
        stateUser.value = { id: "111" };
        const { user } = useUser(rootContextMock);
        expect(user.value).toEqual({ id: "111" });
      });
    });

    describe("isLoggedIn", () => {
      it("should return false when no user is set", () => {
        const { isLoggedIn } = useUser(rootContextMock);
        expect(isLoggedIn.value).toEqual(false);
      });

      it("should return true when user obnject is set", () => {
        stateUser.value = { id: "111" };
        const { isLoggedIn } = useUser(rootContextMock);
        expect(isLoggedIn.value).toEqual(true);
      });
    });
  });

  describe("methods", () => {
    describe("refreshUser", () => {
      it("should get an empty customer when user is not logged in", async () => {
        mockedApiClient.getCustomer.mockResolvedValueOnce(null);
        const { user, refreshUser } = useUser(rootContextMock);
        await refreshUser();
        expect(user.value).toEqual(null);
      });

      it("should get a customer when user is logged in", async () => {
        mockedApiClient.getCustomer.mockResolvedValueOnce({ id: "123" } as any);
        const { user, refreshUser } = useUser(rootContextMock);
        await refreshUser();
        expect(user.value).toEqual({ id: "123" });
      });
      it("should not set user on getCustomer request's rejection", async () => {
        mockedApiClient.getCustomer.mockRejectedValueOnce({
          message: "Some error",
        } as any);
        const { user, refreshUser } = useUser(rootContextMock);
        await refreshUser();
        expect(user.value).toBeNull();
        expect(stateUser.value).toBeNull();
      });
    });
    describe("login", () => {
      it("should not login user without credentials", async () => {
        mockedApiClient.login.mockRejectedValueOnce(
          new Error("Provide username and password for login")
        );
        const { isLoggedIn, error, login } = useUser(rootContextMock);
        const result = await login(undefined as any);
        expect(result).toEqual(false);
        expect(isLoggedIn.value).toBeFalsy();
        expect(error.value).toEqual("Provide username and password for login");
      });

      it("should not login user with bad credentials", async () => {
        mockedApiClient.login.mockRejectedValueOnce(
          new Error("Bad user credentials")
        );
        const { isLoggedIn, error, login } = useUser(rootContextMock);
        const result = await login({
          username: "qwe@qwe.com",
          password: "fakePassword",
        });
        expect(result).toEqual(false);
        expect(isLoggedIn.value).toBeFalsy();
        expect(error.value).toEqual("Bad user credentials");
      });

      it("error message should be appriopriate to the 401 HTTP status code", async () => {
        mockedApiClient.login.mockRejectedValueOnce({
          response: {
            status: 401,
          },
        });
        const { error, login } = useUser(rootContextMock);
        const result = await login({
          username: "qwe@qwe.com",
          password: "fakePassword",
        });
        expect(result).toEqual(false);
        expect(error.value).toEqual(undefined);
      });

      it("should login user successfully", async () => {
        mockedApiClient.login.mockResolvedValueOnce({
          "sw-context-token": "qweqwe",
        } as any);
        mockedApiClient.getCustomer.mockResolvedValueOnce({ id: "123" } as any);
        const { isLoggedIn, error, login } = useUser(rootContextMock);
        const result = await login({
          username: "qwe@qwe.com",
          password: "correctPassword",
        });
        expect(result).toEqual(true);
        expect(isLoggedIn.value).toBeTruthy();
        expect(error.value).toBeFalsy();
      });
    });

    describe("register", () => {
      it("should not invoke user register without any data", async () => {
        mockedApiClient.register.mockRejectedValueOnce(
          new Error("Provide requested information to create user account")
        );
        const { isLoggedIn, error, register } = useUser(rootContextMock);
        const result = await register(undefined as any);
        expect(result).toEqual(false);
        expect(isLoggedIn.value).toBeFalsy();
        expect(error.value).toEqual(
          "Provide requested information to create user account"
        );
      });
      it("should register user successfully", async () => {
        mockedApiClient.register.mockResolvedValueOnce({ data: "mockedData" });
        const { error, register } = useUser(rootContextMock);
        const result = await register({
          firstName: "qwe",
          lastName: "lastName",
          email: "qwe@qwe.com",
          password: "correctPassword",
          salutationId: "salutationId",
          billingAddress: {
            city: "anyCity",
            zipcode: "zip-code",
            countryId: "countryId",
            salutationId: "salutationId",
          },
        });
        expect(result).toBeTruthy();
        expect(error.value).toBeNull();
      });
    });

    describe("logout", () => {
      it("should correctly logout user", async () => {
        stateUser.value = { id: "111" };
        mockedApiClient.logout.mockResolvedValueOnce({
          "sw-context-token": "qweqwe",
        } as any);
        mockedApiClient.getCustomer.mockResolvedValueOnce(null as any);
        const { isLoggedIn, error, logout } = useUser(rootContextMock);
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
        const { isLoggedIn, error, logout } = useUser(rootContextMock);
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
            orderNumber: "100123",
          },
        ];
        mockedApiClient.getCustomerOrders.mockResolvedValueOnce(
          ordersResponse as any
        );
        const { orders, loadOrders } = useUser(rootContextMock);
        expect(orders.value).toBeNull();
        await loadOrders();
        expect(orders.value).toHaveLength(1);
      });
    });

    describe("getOrderDetails", () => {
      it("should return order details for given orderId", async () => {
        const orderResponse = {
          id: "12345",
          orderNumber: "100123",
        };
        mockedApiClient.getCustomerOrderDetails.mockResolvedValueOnce(
          orderResponse as any
        );
        const { getOrderDetails } = useUser(rootContextMock);
        const orderDetails = await getOrderDetails("12345");
        expect(orderDetails).toBe(orderResponse);
      });
    });

    describe("addAddress", () => {
      it("should add address", async () => {
        mockedApiClient.createCustomerAddress.mockResolvedValueOnce("ok");
        const { addAddress } = useUser(rootContextMock);
        const response = await addAddress({ city: "Wrocław" });
        expect(mockedApiClient.createCustomerAddress).toBeCalledTimes(1);
        expect(response).toBe(true);
      });
      it("should not add empty address", async () => {
        mockedApiClient.createCustomerAddress.mockRejectedValueOnce({
          message: "There is no address provided",
        } as ClientApiError);
        const { addAddress, error } = useUser(rootContextMock);
        const response = await addAddress(null as any);
        expect(mockedApiClient.createCustomerAddress).toBeCalledTimes(1);
        expect(response).toBe(false);
        expect(error.value).toEqual("There is no address provided");
      });
    });

    describe("deleteAddress", () => {
      it("should invoke client deleteCustomerAddress method and return true on success", async () => {
        mockedApiClient.deleteCustomerAddress.mockResolvedValueOnce();
        const { deleteAddress } = useUser(rootContextMock);
        const response = await deleteAddress("address-1234");
        expect(mockedApiClient.deleteCustomerAddress).toBeCalledTimes(1);
        expect(response).toBe(true);
      });
      it("should invoke client deleteCustomerAddress method and return false on failure", async () => {
        mockedApiClient.deleteCustomerAddress.mockRejectedValueOnce(
          "Cannot delete the provided address"
        );
        const { deleteAddress } = useUser(rootContextMock);
        const response = await deleteAddress("address-unknown");
        expect(mockedApiClient.deleteCustomerAddress).toBeCalledTimes(1);
        expect(response).toBe(false);
      });
    });

    describe("loadAddresses", () => {
      it("should invoke client getCustomerAddresses method and assign given array to addresses ref", async () => {
        mockedApiClient.getCustomerAddresses.mockResolvedValue([
          {
            id: "addressId-12345",
          },
        ] as any);
        const { addresses, loadAddresses, error } = useUser(rootContextMock);
        await loadAddresses();
        expect(mockedApiClient.getCustomerAddresses).toBeCalledTimes(1);
        expect(error.value).toBeFalsy();
        expect(addresses.value).toStrictEqual([
          {
            id: "addressId-12345",
          },
        ]);
      });

      it("should invoke client getCustomerAddresses method and assign error message if client request is rejected", async () => {
        mockedApiClient.getCustomerAddresses.mockRejectedValueOnce({
          message: "Something went wrong...",
        });
        const { loadAddresses, error } = useUser(rootContextMock);
        await loadAddresses();
        expect(mockedApiClient.getCustomerAddresses).toBeCalledTimes(1);
        expect(error.value).toBe("Something went wrong...");
      });
    });

    describe("loadCountry", () => {
      it("should invoke client getUserCountry method which return country object", async () => {
        mockedApiClient.getUserCountry.mockResolvedValue([
          {
            name: "Poland",
            id: "12345",
          },
        ] as any);
        const { country, loadCountry, error } = useUser(rootContextMock);
        const userId = "123qwe";
        await loadCountry(userId);
        expect(mockedApiClient.getUserCountry).toBeCalledTimes(1);
        expect(error.value).toBeFalsy();
        expect(country.value).toStrictEqual([
          {
            name: "Poland",
            id: "12345",
          },
        ]);
      });

      it("should invoke client getUserCountry method and assign error message if client request is rejected", async () => {
        mockedApiClient.getUserCountry.mockRejectedValueOnce({
          message: "Something went wrong...",
        });
        const { loadCountry, error } = useUser(rootContextMock);
        const salutationId = "123qwe";
        await loadCountry(salutationId);
        expect(mockedApiClient.getUserCountry).toBeCalledTimes(1);
        expect(error.value).toBe("Something went wrong...");
      });
    });

    describe("loadSalutation", () => {
      it("should invoke client getUserSalutation method which return country object", async () => {
        mockedApiClient.getUserSalutation.mockResolvedValue([
          {
            name: "Mrs.",
            id: "12345",
          },
        ] as any);
        const { salutation, loadSalutation, error } = useUser(rootContextMock);
        const salutationId = "123qwe";
        await loadSalutation(salutationId);
        expect(mockedApiClient.getUserSalutation).toBeCalledTimes(1);
        expect(error.value).toBeFalsy();
        expect(salutation.value).toStrictEqual([
          {
            name: "Mrs.",
            id: "12345",
          },
        ]);
      });

      it("should invoke client getUserSalutation method and assign error message if client request is rejected", async () => {
        mockedApiClient.getUserSalutation.mockRejectedValueOnce({
          message: "Something went wrong...",
        });
        const { loadSalutation, error } = useUser(rootContextMock);
        const userId = "123qwe";
        await loadSalutation(userId);
        expect(mockedApiClient.getUserSalutation).toBeCalledTimes(1);
        expect(error.value).toBe("Something went wrong...");
      });
    });

    describe("markAddressAsDefault", () => {
      it("should invoke client setDefaultCustomerBillingAddress method and return true on success", async () => {
        mockedApiClient.setDefaultCustomerBillingAddress.mockResolvedValue(
          "address-1234"
        );
        const { markAddressAsDefault } = useUser(rootContextMock);
        const response = await markAddressAsDefault({
          addressId: "address-1234",
          type: "billing",
        } as any);
        expect(
          mockedApiClient.setDefaultCustomerBillingAddress
        ).toBeCalledTimes(1);
        expect(response).toBe(true);
      });

      it("should invoke client setDefaultCustomerShippingAddress method and return true on success", async () => {
        mockedApiClient.setDefaultCustomerShippingAddress.mockResolvedValue(
          "address-1234"
        );
        const { markAddressAsDefault } = useUser(rootContextMock);
        const response = await markAddressAsDefault({
          addressId: "address-1234",
          type: "shipping",
        } as any);
        expect(
          mockedApiClient.setDefaultCustomerShippingAddress
        ).toBeCalledTimes(1);
        expect(response).toBe(true);
      });

      it("should return false when no argument is provided", async () => {
        const { markAddressAsDefault } = useUser(rootContextMock);
        const response = await markAddressAsDefault({} as any);
        expect(response).toBe(false);
      });

      it("should return false when address type is unknown", async () => {
        const { markAddressAsDefault } = useUser(rootContextMock);
        const response = await markAddressAsDefault({
          type: "unknown",
          addressId: "someId",
        } as any);
        expect(response).toBe(false);
      });

      it("should return false and set the error.value on api-client rejection", async () => {
        mockedApiClient.setDefaultCustomerShippingAddress.mockRejectedValueOnce(
          {
            message: "Error occurred",
          }
        );
        const { markAddressAsDefault, error } = useUser(rootContextMock);
        const response = await markAddressAsDefault({
          type: "shipping",
          addressId: "someId",
        } as any);
        expect(
          mockedApiClient.setDefaultCustomerShippingAddress
        ).toBeCalledTimes(1);

        expect(response).toBe(false);
        expect(error.value).toBe("Error occurred");
      });
    });
    describe("updatePersonalInfo", () => {
      it("should invoke updateProfile api-client method and return true on success", async () => {
        mockedApiClient.updateProfile.mockImplementationOnce(async () =>
          Promise.resolve(undefined)
        );
        const { updatePersonalInfo } = useUser(rootContextMock);
        const response = await updatePersonalInfo({
          title: "some title",
          salutationId: "qweqwe",
          firstName: "qwe",
          lastName: "qew",
        });
        expect(mockedApiClient.updateProfile).toBeCalledTimes(1);
        expect(response).toBeTruthy();
      });
    });
    it("should return false and set the error.value on api-client on updateProfile rejection", async () => {
      mockedApiClient.updateProfile.mockImplementationOnce(async () =>
        Promise.reject("Incorrect user data")
      );
      const { updatePersonalInfo, error } = useUser(rootContextMock);
      const response = await updatePersonalInfo({
        title: "some title",
        salutationId: "",
        firstName: "qwe",
        lastName: "qew",
      });
      expect(mockedApiClient.updateProfile).toBeCalledTimes(1);
      expect(response).toBeFalsy();
      expect(error.value).toEqual("Incorrect user data");
    });
  });
  describe("updatePassword", () => {
    it("should invoke updatePassword api-client method and return true on success", async () => {
      mockedApiClient.updatePassword.mockImplementationOnce(async () =>
        Promise.resolve(undefined)
      );
      const { updatePassword } = useUser(rootContextMock);
      const response = await updatePassword({
        password: "qweqweqwe",
        newPassword: "qweqweqwe1",
        newPasswordConfirm: "qweqweqwe1",
      });
      expect(mockedApiClient.updatePassword).toBeCalledTimes(1);
      expect(response).toBeTruthy();
    });
    it("should return false and set the error.value on api-client on updatePassword rejection", async () => {
      mockedApiClient.updatePassword.mockImplementationOnce(async () =>
        Promise.reject("Password must be at least 8 characters long")
      );
      const { updatePassword, error } = useUser(rootContextMock);
      const response = await updatePassword({
        password: "qweqweqwe",
        newPassword: "qwe",
        newPasswordConfirm: "qwe",
      });
      expect(mockedApiClient.updatePassword).toBeCalledTimes(1);
      expect(response).toBeFalsy();
      expect(error.value).toEqual(
        "Password must be at least 8 characters long"
      );
    });
  });
  describe("resetPassword", () => {
    it("should invoke resetPassword api-client method and return true on success", async () => {
      mockedApiClient.resetPassword.mockImplementationOnce(async () =>
        Promise.resolve(undefined)
      );
      const { resetPassword } = useUser(rootContextMock);
      const response = await resetPassword({
        email: "qweqwe@qwe.com",
      });
      expect(mockedApiClient.resetPassword).toBeCalledTimes(1);
      expect(response).toBeTruthy();
    });
    it("should return false and set the error.value on api-client on resetPassword rejection", async () => {
      mockedApiClient.resetPassword.mockImplementationOnce(async () =>
        Promise.reject("Email does not fit to any in Sales Channel")
      );
      const { resetPassword, error } = useUser(rootContextMock);
      const response = await resetPassword({
        email: "qweqwe@qwe.com",
      });
      expect(mockedApiClient.resetPassword).toBeCalledTimes(1);
      expect(response).toBeFalsy();
      expect(error.value).toEqual("Email does not fit to any in Sales Channel");
    });
  });
  describe("updateEmail", () => {
    it("should invoke updateEmail api-client method and return true on success", async () => {
      mockedApiClient.updateEmail.mockImplementationOnce(async () =>
        Promise.resolve(undefined)
      );
      const { updateEmail } = useUser(rootContextMock);
      const response = await updateEmail({
        password: "qweqweqwe",
        email: "qweqwe@qwe.com",
        emailConfirmation: "qweqwe@qwe.com",
      });
      expect(mockedApiClient.updateEmail).toBeCalledTimes(1);
      expect(response).toBeTruthy();
    });
    it("should return false and set the error.value on api-client on updatePassword rejection", async () => {
      mockedApiClient.updateEmail.mockImplementationOnce(async () =>
        Promise.reject("Email confirmation does not match to the first one")
      );
      const { updateEmail, error } = useUser(rootContextMock);
      const response = await updateEmail({
        password: "qweqweqwe",
        email: "qweqwe@qwe.com",
        emailConfirmation: "qweqwe1@qwe.com",
      });
      expect(mockedApiClient.updateEmail).toBeCalledTimes(1);
      expect(response).toBeFalsy();
      expect(error.value).toEqual(
        "Email confirmation does not match to the first one"
      );
    });
  });
});
