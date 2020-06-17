import { getCustomerAddressSetDefaultShippingEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";
import { setDefaultCustomerShippingAddress } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - setDefaultCustomerShippingAddress", () => {
  const mockedPatch = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      patch: mockedPatch,
    } as any;
  });

  it("rejects the promise if provided addressId does not exist", async () => {
    mockedPatch.mockRejectedValueOnce(
      new Error("400 - address does not exist")
    );
    expect(setDefaultCustomerShippingAddress("1234")).rejects.toThrow(
      "400 - address does not exist"
    );
    expect(mockedPatch).toBeCalledTimes(1);
    expect(mockedPatch).toBeCalledWith(
      getCustomerAddressSetDefaultShippingEndpoint("1234")
    );
  });

  it("returns no data if successfully set", async () => {
    mockedPatch.mockResolvedValueOnce({ data: "12345" });
    const result = await setDefaultCustomerShippingAddress("12345");
    expect(result).toBe("12345");
    expect(mockedPatch).toBeCalledTimes(1);
    expect(mockedPatch).toBeCalledWith(
      getCustomerAddressSetDefaultShippingEndpoint("12345")
    );
  });
});
