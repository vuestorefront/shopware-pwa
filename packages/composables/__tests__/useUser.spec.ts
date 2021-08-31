import { Ref, ref } from "vue-demi";

// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

const consoleErrorSpy = jest.spyOn(console, "error");

import { useUser } from "../src/hooks/useUser";
import { prepareRootContextMock } from "./contextRunner";
describe("Composables - useUser", () => {
  const stateUser: Ref<Object | null> = ref(null);
  const rootContextMock = prepareRootContextMock();

  const interceptMock = jest.fn();
  const broadcastMock = jest.fn();
  const refreshSessionContextMock = jest.fn();
  const refreshCartMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    stateUser.value = null;
    mockedComposables.useIntercept.mockImplementation(() => {
      return {
        broadcast: broadcastMock,
        intercept: interceptMock,
      } as any;
    });

    mockedComposables.useSessionContext.mockImplementation(() => {
      return {
        refreshSessionContext: refreshSessionContextMock,
      } as any;
    });

    mockedComposables.useSharedState.mockImplementation(() => {
      return {
        sharedRef: () => stateUser,
      } as any;
    });

    mockedComposables.useCart.mockImplementation(() => {
      return {
        refreshCart: refreshCartMock,
      } as any;
    });

    mockedComposables.useDefaults.mockImplementation(() => {
      return {
        getDefaults: () => {},
      } as any;
    });

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);

    consoleErrorSpy.mockImplementationOnce(() => {});
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
    describe("isCustomerSession", () => {
      it("should return false when user is not a guest", () => {
        stateUser.value = { id: "111", guest: true };
        const { isCustomerSession } = useUser();
        expect(isCustomerSession.value).toEqual(false);
      });
      it("should return true if there is no user data in state", () => {
        stateUser.value = null;
        const { isCustomerSession } = useUser();
        expect(isCustomerSession.value).toEqual(false);
      });
    });
    describe("isGuestSession", () => {
      it("should return true if user has a data and it's a guest", () => {
        stateUser.value = { id: "111", guest: true };
        const { isGuestSession } = useUser();
        expect(isGuestSession.value).toEqual(true);
      });

      it("should return false if user has a data and it's not a guest", () => {
        stateUser.value = { id: "111", guest: false };
        const { isGuestSession } = useUser();
        expect(isGuestSession.value).toEqual(false);
      });

      it("should return false if user is not logged in (have no customer data in state)", () => {
        stateUser.value = null;
        const { isGuestSession } = useUser();
        expect(isGuestSession.value).toEqual(false);
      });
    });
  });

  describe("methods", () => {
    describe("onUserLogin", () => {
      it("should invoke an intercept function on onUserLogin event", async () => {
        const { onUserLogin } = useUser();
        const callback = jest.fn();
        await onUserLogin(callback);
        expect(interceptMock).toBeCalledTimes(1);
      });
    });
    describe("onUserRegister", () => {
      it("should invoke an intercept function on onUserRegister event", async () => {
        const { onUserRegister } = useUser();
        const callback = jest.fn();
        await onUserRegister(callback);
        expect(interceptMock).toBeCalledTimes(1);
      });
    });
    describe("onLogout", () => {
      it("should invoke an intercept function on onLogout event", async () => {
        const { onLogout } = useUser();
        const callback = jest.fn();
        await onLogout(callback);

        expect(interceptMock).toBeCalledTimes(1);
      });
    });
    describe("refreshUser", () => {
      it("should set empty object customer when user is not logged in and false for loggedIn flag", async () => {
        mockedApiClient.getCustomer.mockResolvedValueOnce(null);
        const { user, refreshUser, isLoggedIn } = useUser();
        await refreshUser();
        expect(user.value).toEqual({});
        expect(isLoggedIn.value).toEqual(false);
      });

      it("should get a customer when user is logged in", async () => {
        mockedApiClient.getCustomer.mockResolvedValueOnce({
          id: "123",
        } as any);
        const { user, refreshUser } = useUser();
        await refreshUser();
        expect(user.value).toEqual({ id: "123" });
      });
      it("should set empty user on getCustomer request's rejection", async () => {
        mockedApiClient.getCustomer.mockRejectedValueOnce({
          message: "Some error",
        } as any);
        const { user, refreshUser, isLoggedIn } = useUser();
        await refreshUser();
        expect(user.value).toEqual({});
        expect(stateUser.value).toEqual({});
        expect(isLoggedIn.value).toEqual(false);
        expect(consoleErrorSpy).toBeCalledWith("[useUser][refreshUser]", {
          message: "Some error",
        });
      });
    });
    describe("login", () => {
      it("should not login user without credentials", async () => {
        mockedApiClient.login.mockRejectedValueOnce({
          messages: [{ detail: "Provide username and password for login" }],
        } as any);
        const { isLoggedIn, errors, login } = useUser();
        const result = await login(undefined as any);
        expect(result).toEqual(false);
        expect(isLoggedIn.value).toBeFalsy();
        expect(errors.login).toEqual([
          { detail: "Provide username and password for login" },
        ]);
      });

      it("should not login user with bad credentials", async () => {
        mockedApiClient.login.mockRejectedValueOnce({
          messages: [{ detail: "Bad user credentials" }],
        } as any);
        const { isLoggedIn, errors, login } = useUser();
        const result = await login({
          username: "qwe@qwe.com",
          password: "fakePassword",
        });
        expect(result).toEqual(false);
        expect(isLoggedIn.value).toBeFalsy();
        expect(errors.login).toEqual([{ detail: "Bad user credentials" }]);
      });

      it("error message should be appriopriate to the 401 HTTP status code", async () => {
        mockedApiClient.login.mockRejectedValueOnce({
          response: {
            status: 401,
          },
        });
        const { errors, login } = useUser();
        const result = await login({
          username: "qwe@qwe.com",
          password: "fakePassword",
        });
        expect(result).toEqual(false);
        expect(errors.login).toEqual(undefined);
      });

      it("should login user successfully", async () => {
        mockedApiClient.login.mockResolvedValueOnce({
          "sw-context-token": "qweqwe",
        } as any);
        mockedApiClient.getCustomer.mockResolvedValue({
          id: "123",
        } as any);
        const { isLoggedIn, error, login } = useUser();
        const result = await login({
          username: "qwe@qwe.com",
          password: "correctPassword",
        });
        expect(result).toEqual(true);
        expect(isLoggedIn.value).toBeTruthy();
        expect(error.value).toBeFalsy();
      });

      it("should refresh cart after login", async () => {
        mockedApiClient.login.mockResolvedValueOnce({
          "sw-context-token": "qweqwe",
        } as any);
        mockedApiClient.getCustomer.mockResolvedValue({
          id: "123",
        } as any);
        const { login } = useUser();
        await login({
          username: "qwe@qwe.com",
          password: "correctPassword",
        });
        expect(refreshCartMock).toBeCalled();
      });
    });

    describe("register", () => {
      it("should not invoke user register without any data", async () => {
        mockedApiClient.register.mockRejectedValueOnce({
          messages: [
            { detail: "Provide requested information to create user account" },
          ],
        } as any);
        const { isLoggedIn, errors, register } = useUser();
        const result = await register(undefined as any);
        expect(result).toEqual(false);
        expect(isLoggedIn.value).toBeFalsy();
        expect(errors.register).toEqual([
          {
            detail: "Provide requested information to create user account",
          },
        ]);
      });
      it("should register user successfully", async () => {
        mockedApiClient.register.mockResolvedValueOnce({
          data: "mockedData",
        });
        const { errors, register } = useUser();
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
        expect(errors.register).toEqual([]);
      });
      it("should register user successfully and set empty object on unknown response", async () => {
        mockedApiClient.register.mockResolvedValueOnce(undefined as any);
        const { register, user } = useUser();
        await register({} as any);
        expect(user.value).toStrictEqual({});
      });

      it("should refresh session context after user registration", async () => {
        mockedApiClient.register.mockResolvedValueOnce(undefined as any);
        const { register } = useUser();
        await register({} as any);
        expect(refreshSessionContextMock).toBeCalled();
      });
    });

    describe("logout", () => {
      it("should correctly logout user", async () => {
        stateUser.value = { id: "111" };
        mockedApiClient.logout.mockResolvedValueOnce({
          "sw-context-token": "qweqwe",
        } as any);
        mockedApiClient.getCustomer.mockResolvedValueOnce(null as any);
        const { isLoggedIn, error, logout } = useUser();
        expect(isLoggedIn.value).toBeTruthy();
        await logout();
        expect(isLoggedIn.value).toBeFalsy();
        expect(error.value).toBeFalsy();
      });

      it("should refresh cart after logout", async () => {
        stateUser.value = { id: "111" };
        mockedApiClient.logout.mockResolvedValueOnce({
          "sw-context-token": "qweqwe",
        } as any);
        mockedApiClient.getCustomer.mockResolvedValueOnce(null as any);
        const { logout } = useUser();
        await logout();
        expect(refreshCartMock).toBeCalled();
      });

      it("should show an error when user is not logged out", async () => {
        stateUser.value = { id: "111" };
        mockedApiClient.logout.mockRejectedValueOnce({
          messages: [{ detail: "Something wrong with logout" }],
        });
        mockedApiClient.getCustomer.mockResolvedValueOnce({
          id: "111",
        } as any);
        const { isLoggedIn, error, logout } = useUser();
        expect(isLoggedIn.value).toBeTruthy();
        await logout();
        expect(isLoggedIn.value).toBeTruthy();
        expect(error.value).toEqual([
          { detail: "Something wrong with logout" },
        ]);
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
        const { country, loadCountry, error } = useUser();
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
          messages: [{ detail: "Something went wrong..." }],
        });
        const { loadCountry, error } = useUser();
        const salutationId = "123qwe";
        await loadCountry(salutationId);
        expect(mockedApiClient.getUserCountry).toBeCalledTimes(1);
        expect(error.value).toStrictEqual([
          { detail: "Something went wrong..." },
        ]);
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
        const { salutation, loadSalutation, error } = useUser();
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
          messages: [{ detail: "Something went wrong..." }],
        });
        const { loadSalutation, error } = useUser();
        const userId = "123qwe";
        await loadSalutation(userId);
        expect(mockedApiClient.getUserSalutation).toBeCalledTimes(1);
        expect(error.value).toStrictEqual([
          { detail: "Something went wrong..." },
        ]);
      });
    });

    describe("updatePersonalInfo", () => {
      it("should invoke updateProfile api-client method and return true on success", async () => {
        mockedApiClient.updateProfile.mockImplementationOnce(async () =>
          Promise.resolve(undefined)
        );
        const { updatePersonalInfo } = useUser();
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
      const { updatePersonalInfo, error } = useUser();
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
  describe("updateEmail", () => {
    it("should invoke updateEmail api-client method and return true on success", async () => {
      mockedApiClient.updateEmail.mockImplementationOnce(async () =>
        Promise.resolve(undefined)
      );
      const { updateEmail } = useUser();
      const response = await updateEmail({
        password: "qweqweqwe",
        email: "qweqwe@qwe.com",
        emailConfirmation: "qweqwe@qwe.com",
      });
      expect(mockedApiClient.updateEmail).toBeCalledTimes(1);
      expect(response).toBeTruthy();
    });
    it("should return false and set the error.value on api-client on updatePassword rejection", async () => {
      mockedApiClient.updateEmail.mockRejectedValueOnce({
        messages: [
          { detail: "Email confirmation does not match to the first one" },
        ],
      });

      const { updateEmail, errors } = useUser();
      const response = await updateEmail({
        password: "qweqweqwe",
        email: "qweqwe@qwe.com",
        emailConfirmation: "qweqwe1@qwe.com",
      });
      expect(mockedApiClient.updateEmail).toBeCalledTimes(1);
      expect(response).toBeFalsy();
      expect(errors.updateEmail).toEqual([
        { detail: "Email confirmation does not match to the first one" },
      ]);
    });
  });
});
