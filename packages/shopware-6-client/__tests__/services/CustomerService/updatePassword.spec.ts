import { getCustomerUpdatePasswordEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";
import { internet } from "faker";
import { updatePassword } from "@shopware-pwa/shopware-6-client";

const newPassword = internet.password(8);
const credentials = {
  password: internet.password(8),
  newPassword: newPassword,
  newPasswordConfirm: newPassword,
};

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - updatePassword", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("rejects the promise if the password is to short", async () => {
    mockedPost.mockRejectedValueOnce(new Error("400 - password too short"));
    expect(
      updatePassword({
        password: credentials.password,
        newPassword: "!23",
        newPasswordConfirm: "!23",
      })
    ).rejects.toThrow("400 - password too short");
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerUpdatePasswordEndpoint(), {
      password: credentials.password,
      newPassword: "!23",
      newPasswordConfirm: "!23",
    });
  });

  it("rejects the promise if the passwordConfirmation does not match", async () => {
    mockedPost.mockRejectedValueOnce(
      new Error("400 - new password confirmation does not match")
    );
    expect(
      updatePassword({
        password: credentials.password,
        newPassword: credentials.newPassword,
        newPasswordConfirm: `${credentials.newPassword}_123`,
      })
    ).rejects.toThrow("400 - new password confirmation does not match");
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerUpdatePasswordEndpoint(), {
      password: credentials.password,
      newPassword: credentials.newPassword,
      newPasswordConfirm: `${credentials.newPassword}_123`,
    });
  });

  it("returns no data if successfully updated", async () => {
    mockedPost.mockResolvedValueOnce(null);
    const result = await updatePassword({
      password: credentials.password,
      newPassword: credentials.newPassword,
      newPasswordConfirm: credentials.newPassword,
    });
    expect(result).toBeFalsy();
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerUpdatePasswordEndpoint(), {
      password: credentials.password,
      newPassword: credentials.newPassword,
      newPasswordConfirm: credentials.newPassword,
    });
  });
});
