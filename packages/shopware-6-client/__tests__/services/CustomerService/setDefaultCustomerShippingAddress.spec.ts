import { random } from "faker";
import { getCustomerAddressSetDefaultShippingEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import {
  setDefaultCustomerShippingAddress,
  update,
  config,
} from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - setDefaultCustomerShippingAddress", () => {
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
    expect(setDefaultCustomerShippingAddress("1234")).rejects.toThrow(
      "400 - address does not exist"
    );
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerAddressSetDefaultShippingEndpoint("1234")
    );
  });

  it("returns no data if successfully set", async () => {
    mockedAxios.patch.mockResolvedValueOnce({ data: "12345" });
    const result = await setDefaultCustomerShippingAddress("12345");
    expect(result).toBe("12345");
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerAddressSetDefaultShippingEndpoint("12345")
    );
  });
});
