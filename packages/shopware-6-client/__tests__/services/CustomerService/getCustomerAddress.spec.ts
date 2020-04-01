import {
  getCustomerAddress,
  update,
  config,
} from "@shopware-pwa/shopware-6-client";
import { getCustomerAddressEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import { random } from "faker";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - getCustomerAddress", () => {
  let contextToken: string;
  beforeEach(() => {
    jest.resetAllMocks();

    contextToken = random.uuid();

    update({ contextToken });
  });
  afterEach(() => {
    expect(config.contextToken).toEqual(contextToken);
  });

  it("should return address object", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { id: "2bbb89dfa4664bc681e80b37eaa80fb7" } },
    });
    const result = await getCustomerAddress("2bbb89dfa4664bc681e80b37eaa80fb7");
    expect(result.id).toEqual("2bbb89dfa4664bc681e80b37eaa80fb7");
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      getCustomerAddressEndpoint("2bbb89dfa4664bc681e80b37eaa80fb7")
    );
  });

  it("rejects the promise if the customerId is incorrect", async () => {
    mockedAxios.get.mockRejectedValueOnce(
      new Error("400 - such addressId does not exist")
    );
    expect(getCustomerAddress("wrong-id")).rejects.toThrow(
      "400 - such addressId does not exist"
    );
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      getCustomerAddressEndpoint("wrong-id")
    );
  });
});
