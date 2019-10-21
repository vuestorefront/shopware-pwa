import { getCustomerAddressSetDefaultShippingEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import { setDefaultCustomerShippingAddress } from "../../../src";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - updateDefaultCustomerShippingAddress", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("rejects the promise if provided addressId does not exist", async () => {
    mockedAxios.patch.mockRejectedValueOnce(
      new Error("400 - address does not exist")
    );
    expect(setDefaultCustomerShippingAddress("1234")).rejects.toThrow(
      "400 - address does not exist"
    );
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerAddressSetDefaultShippingEndpoint("1234"),
      { headers: { "sw-context-token": undefined } }
    );
  });

  it("returns no data if successfully set", async () => {
    mockedAxios.patch.mockResolvedValueOnce({ data: "12345" });
    const result = await setDefaultCustomerShippingAddress("12345");
    expect(result).toBe("12345");
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerAddressSetDefaultShippingEndpoint("12345"),
      { headers: { "sw-context-token": undefined } }
    );
  });
});
