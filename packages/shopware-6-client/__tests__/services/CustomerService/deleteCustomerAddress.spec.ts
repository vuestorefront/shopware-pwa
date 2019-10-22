import { getCustomerAddressEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import {
  deleteCustomerAddress,
  update,
  config
} from "@shopware-pwa/shopware-6-client";
import { random } from "faker";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - deleteCustomerAddress", () => {
  let contextToken: string;

  beforeEach(() => {
    jest.resetAllMocks();
    contextToken = random.uuid();
    update({ contextToken });
  });
  afterEach(() => {
    expect(config.contextToken).toEqual(contextToken);
  });

  it("rejects the promise if the address does not exist", async () => {
    mockedAxios.delete.mockRejectedValueOnce(
      new Error("400 - customer's address not found")
    );
    expect(
      deleteCustomerAddress("2bbb89dfa4664bc681e80b37eaa80fb7")
    ).rejects.toThrow("400 - customer's address not found");
    expect(mockedAxios.delete).toBeCalledTimes(1);
    expect(mockedAxios.delete).toBeCalledWith(
      getCustomerAddressEndpoint("2bbb89dfa4664bc681e80b37eaa80fb7")
    );
  });

  it("returns no data if successfully deleted", async () => {
    mockedAxios.delete.mockResolvedValue(null);

    await deleteCustomerAddress("2bbb89dfa4664bc681e80b37eaa80fb7");
    expect(mockedAxios.delete).toBeCalledTimes(1);
    expect(mockedAxios.delete).toBeCalledWith(
      getCustomerAddressEndpoint("2bbb89dfa4664bc681e80b37eaa80fb7")
    );
  });
});
