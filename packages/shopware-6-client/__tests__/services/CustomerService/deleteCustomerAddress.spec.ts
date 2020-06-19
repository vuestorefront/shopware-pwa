import { getCustomerAddressEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";
import { deleteCustomerAddress } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - deleteCustomerAddress", () => {
  const mockedDelete = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      delete: mockedDelete,
    } as any;
  });

  it("rejects the promise if the address does not exist", async () => {
    mockedDelete.mockRejectedValueOnce(
      new Error("400 - customer's address not found")
    );
    expect(
      deleteCustomerAddress("2bbb89dfa4664bc681e80b37eaa80fb7")
    ).rejects.toThrow("400 - customer's address not found");
    expect(mockedDelete).toBeCalledTimes(1);
    expect(mockedDelete).toBeCalledWith(
      getCustomerAddressEndpoint("2bbb89dfa4664bc681e80b37eaa80fb7")
    );
  });

  it("returns no data if successfully deleted", async () => {
    mockedDelete.mockResolvedValue(null);

    await deleteCustomerAddress("2bbb89dfa4664bc681e80b37eaa80fb7");
    expect(mockedDelete).toBeCalledTimes(1);
    expect(mockedDelete).toBeCalledWith(
      getCustomerAddressEndpoint("2bbb89dfa4664bc681e80b37eaa80fb7")
    );
  });
});
