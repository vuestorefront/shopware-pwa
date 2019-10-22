import { logout } from "@shopware-pwa/shopware-6-client";
import { getCustomerLogoutEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - logout", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should log out the customer", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: null });
    await logout();
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(getCustomerLogoutEndpoint());
  });
});
