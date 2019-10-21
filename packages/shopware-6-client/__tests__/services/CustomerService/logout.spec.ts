import { logout } from "../../../src/index";
import { when } from "jest-when";
import { getCustomerLogoutEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - logout", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should log out the customer", async () => {
    when(mockedAxios.post)
      .expectCalledWith(getCustomerLogoutEndpoint())
      .mockReturnValueOnce("");
    const result = await logout();
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(getCustomerLogoutEndpoint(), null, {
      headers: { "sw-context-token": undefined }
    });
    expect(result).toBeUndefined();
  });
});
