import { login } from "../../../src/index";
import { when } from "jest-when";
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
    when(mockedAxios.post)
      .expectCalledWith(getCustomerLoginEndpoint(), {
        username: credentials.username,
        password: credentials.password
      })
      .mockReturnValueOnce({
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
    expect(result).toHaveProperty("sw-context-token");
  });
  it("should throws unhandled rejection - 401", async () => {
    when(mockedAxios.post.mockRejectedValue(new Error())).expectCalledWith(
      getCustomerLoginEndpoint(),
      {
        username: credentials.username,
        password: "wrong-password-123456"
      }
    );

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
