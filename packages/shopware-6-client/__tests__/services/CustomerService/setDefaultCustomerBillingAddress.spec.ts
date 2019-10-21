import { getCustomerAddressSetDefaultBillingEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import { setDefaultCustomerBillingAddress } from "../../../src";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - updateDefaultCustomerBillingAddress", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("rejects the promise if provided addressId does not exist", async () => {
    mockedAxios.patch.mockRejectedValueOnce(
      new Error("400 - address does not exist")
    );
    expect(setDefaultCustomerBillingAddress("1234")).rejects.toThrow(
      "400 - address does not exist"
    );
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerAddressSetDefaultBillingEndpoint("1234"),
      { headers: { "sw-context-token": undefined } }
    );
  });

  it("returns no data if successfully set", async () => {
    mockedAxios.patch.mockResolvedValueOnce({ data: "12345" });
    const result = await setDefaultCustomerBillingAddress("12345");
    expect(result).toBe("12345");
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerAddressSetDefaultBillingEndpoint("12345"),
      { headers: { "sw-context-token": undefined } }
    );
  });
});
