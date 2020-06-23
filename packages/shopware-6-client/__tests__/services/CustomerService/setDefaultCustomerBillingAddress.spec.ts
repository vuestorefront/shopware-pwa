import { getCustomerAddressSetDefaultBillingEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";
import { setDefaultCustomerBillingAddress } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - updateDefaultCustomerBillingAddress", () => {
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
    expect(setDefaultCustomerBillingAddress("1234")).rejects.toThrow(
      "400 - address does not exist"
    );
    expect(mockedPatch).toBeCalledTimes(1);
    expect(mockedPatch).toBeCalledWith(
      getCustomerAddressSetDefaultBillingEndpoint("1234")
    );
  });

  it("returns no data if successfully set", async () => {
    mockedPatch.mockResolvedValueOnce({ data: "12345" });
    const result = await setDefaultCustomerBillingAddress("12345");
    expect(result).toBe("12345");
    expect(mockedPatch).toBeCalledTimes(1);
    expect(mockedPatch).toBeCalledWith(
      getCustomerAddressSetDefaultBillingEndpoint("12345")
    );
  });
});
