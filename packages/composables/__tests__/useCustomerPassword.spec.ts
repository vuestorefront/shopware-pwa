import { Ref, ref } from "vue-demi";
// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

const consoleErrorSpy = jest.spyOn(console, "error");

import { useCustomerPassword } from "../src/hooks/useCustomerPassword";
import { prepareRootContextMock } from "./contextRunner";
describe("Composables - useCustomerPassword", () => {
  const stateUser: Ref<Object | null> = ref(null);
  const rootContextMock = prepareRootContextMock();

  const refreshSessionContextMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    stateUser.value = null;
    mockedComposables.useSessionContext.mockImplementation(() => {
      return {
        refreshSessionContext: refreshSessionContextMock,
      } as any;
    });

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);

    consoleErrorSpy.mockImplementationOnce(() => {});
  });

  describe("methods", () => {
    describe("updatePassword", () => {
      it("should invoke updatePassword api-client method and return true on success", async () => {
        mockedApiClient.updatePassword.mockImplementationOnce(async () =>
          Promise.resolve(undefined)
        );
        const { updatePassword } = useCustomerPassword();
        const response = await updatePassword({
          password: "qweqweqwe",
          newPassword: "qweqweqwe1",
          newPasswordConfirm: "qweqweqwe1",
        });
        expect(mockedApiClient.updatePassword).toBeCalledTimes(1);
        expect(response).toBeTruthy();
      });
      it("should return false and set the error.value on api-client on updatePassword rejection", async () => {
        mockedApiClient.updatePassword.mockRejectedValueOnce({
          messages: [{ detail: "Password must be at least 8 characters long" }],
        });
        const { updatePassword, errors } = useCustomerPassword();
        const response = await updatePassword({
          password: "qweqweqwe",
          newPassword: "qwe",
          newPasswordConfirm: "qwe",
        });
        expect(mockedApiClient.updatePassword).toBeCalledTimes(1);
        expect(response).toBeFalsy();
        expect(errors.updatePassword).toEqual([
          { detail: "Password must be at least 8 characters long" },
        ]);
      });
    });
    describe("resetPassword", () => {
      it("should invoke resetPassword api-client method and return true on success", async () => {
        mockedApiClient.resetPassword.mockImplementationOnce(async () =>
          Promise.resolve(undefined)
        );
        const { resetPassword } = useCustomerPassword();
        const response = await resetPassword({
          email: "qweqwe@qwe.com",
        });
        expect(mockedApiClient.resetPassword).toBeCalledTimes(1);
        expect(response).toBeTruthy();
      });
      it("should return false and set the error.value on api-client on resetPassword rejection", async () => {
        mockedApiClient.resetPassword.mockRejectedValueOnce({
          messages: [{ detail: "Email does not fit to any in Sales Channel" }],
        });
        const { resetPassword, errors } = useCustomerPassword();
        const response = await resetPassword({
          email: "qweqwe@qwe.com",
        });
        expect(mockedApiClient.resetPassword).toBeCalledTimes(1);
        expect(response).toBeFalsy();
        expect(errors.resetPassword).toEqual([
          { detail: "Email does not fit to any in Sales Channel" },
        ]);
      });
    });
  });
});
