import { random } from "faker";
import { getCustomerAddressSetDefaultBillingEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import {
  update,
  config,
  setDefaultCustomerBillingAddress
} from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - updateDefaultCustomerBillingAddress", () => {
  let contextToken: string;
  beforeEach(() => {
    jest.resetAllMocks();
    contextToken = random.uuid();
    update({ contextToken });
  });
  afterEach(() => {
    expect(config.contextToken).toEqual(contextToken);
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
      getCustomerAddressSetDefaultBillingEndpoint("1234")
    );
  });

  it("returns no data if successfully set", async () => {
    mockedAxios.patch.mockResolvedValueOnce({ data: "12345" });
    const result = await setDefaultCustomerBillingAddress("12345");
    expect(result).toBe("12345");
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerAddressSetDefaultBillingEndpoint("12345")
    );
  });
});
