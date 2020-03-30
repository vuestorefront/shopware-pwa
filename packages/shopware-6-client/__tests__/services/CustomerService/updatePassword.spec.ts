import { getCustomerUpdatePasswordEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import { internet, random } from "faker";
import {
  updatePassword,
  update,
  config,
} from "@shopware-pwa/shopware-6-client";

const newPassword = internet.password(8);
const credentials = {
  password: internet.password(8),
  newPassword: newPassword,
  newPasswordConfirm: newPassword,
};

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - updatePassword", () => {
  let contextToken: string;
  beforeEach(() => {
    jest.resetAllMocks();
    contextToken = random.uuid();
    update({ contextToken });
  });
  afterEach(() => {
    expect(config.contextToken).toEqual(contextToken);
  });

  it("rejects the promise if the password is to short", async () => {
    mockedAxios.patch.mockRejectedValueOnce(
      new Error("400 - password too short")
    );
    expect(
      updatePassword({
        password: credentials.password,
        newPassword: "!23",
        newPasswordConfirm: "!23",
      })
    ).rejects.toThrow("400 - password too short");
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerUpdatePasswordEndpoint(),
      {
        password: credentials.password,
        newPassword: "!23",
        newPasswordConfirm: "!23",
      }
    );
  });

  it("rejects the promise if the passwordConfirmation does not match", async () => {
    mockedAxios.patch.mockRejectedValueOnce(
      new Error("400 - new password confirmation does not match")
    );
    expect(
      updatePassword({
        password: credentials.password,
        newPassword: credentials.newPassword,
        newPasswordConfirm: `${credentials.newPassword}_123`,
      })
    ).rejects.toThrow("400 - new password confirmation does not match");
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerUpdatePasswordEndpoint(),
      {
        password: credentials.password,
        newPassword: credentials.newPassword,
        newPasswordConfirm: `${credentials.newPassword}_123`,
      }
    );
  });

  it("returns no data if successfully updated", async () => {
    mockedAxios.patch.mockResolvedValueOnce(null);
    const result = await updatePassword({
      password: credentials.password,
      newPassword: credentials.newPassword,
      newPasswordConfirm: credentials.newPassword,
    });
    expect(result).toBeFalsy();
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerUpdatePasswordEndpoint(),
      {
        password: credentials.password,
        newPassword: credentials.newPassword,
        newPasswordConfirm: credentials.newPassword,
      }
    );
  });
});
