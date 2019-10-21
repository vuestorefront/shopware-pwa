import { getCustomerAddressEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";
import { deleteCustomerAddress } from "../../../src";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - deleteCustomerAddress", () => {
  beforeEach(() => {
    jest.resetAllMocks();
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
      getCustomerAddressEndpoint("2bbb89dfa4664bc681e80b37eaa80fb7"),
      { headers: { "sw-context-token": undefined } }
    );
  });

  it("returns no data if successfully deleted", async () => {
    mockedAxios.delete.mockResolvedValue(null);
    expect(
      await deleteCustomerAddress("2bbb89dfa4664bc681e80b37eaa80fb7")
    ).toBeNull();
    expect(mockedAxios.delete).toBeCalledTimes(1);
    expect(mockedAxios.delete).toBeCalledWith(
      getCustomerAddressEndpoint("2bbb89dfa4664bc681e80b37eaa80fb7"),
      { headers: { "sw-context-token": undefined } }
    );
  });
});
