import { login, config } from "@shopware-pwa/shopware-6-client";
import { getCustomerLoginEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import { internet } from "faker";

const credentials = {
  username: internet.email(),
  password: internet.password(8)
};

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - login", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return context token", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { "sw-context-token": "RmzTExFStSBW5GhPmQNicSK6bhUQhqXi" }
    });

    const result = await login({
      username: credentials.username,
      password: credentials.password
    });
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(getCustomerLoginEndpoint(), {
      username: credentials.username,
      password: credentials.password
    });

    expect(result.contextToken).toEqual("RmzTExFStSBW5GhPmQNicSK6bhUQhqXi");
    expect(config.contextToken).toEqual("RmzTExFStSBW5GhPmQNicSK6bhUQhqXi");
  });
  it("should throws unhandled rejection - 401", async () => {
    mockedAxios.post.mockRejectedValue(new Error());

    expect(
      login({
        username: credentials.username,
        password: "wrong-password-123456"
      })
    ).rejects.toThrow();

    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(getCustomerLoginEndpoint(), {
      username: credentials.username,
      password: "wrong-password-123456"
    });
  });
});
