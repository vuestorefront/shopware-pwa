import { getCustomerAddress } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - getCustomerAddress", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });

  it("should return address object", async () => {
    mockedGet.mockResolvedValueOnce({
      data: { id: "2bbb89dfa4664bc681e80b37eaa80fb7" },
    });
    const result = await getCustomerAddress("2bbb89dfa4664bc681e80b37eaa80fb7");
    expect(result.id).toEqual("2bbb89dfa4664bc681e80b37eaa80fb7");
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v4/account/list-address", {
      params: { ids: ["2bbb89dfa4664bc681e80b37eaa80fb7"] },
    });
  });

  it("rejects the promise if the customerId is incorrect", async () => {
    mockedGet.mockRejectedValueOnce(
      new Error("400 - such addressId does not exist")
    );
    expect(getCustomerAddress("wrong-id")).rejects.toThrow(
      "400 - such addressId does not exist"
    );
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v4/account/list-address", {
      params: { ids: ["wrong-id"] },
    });
  });
});
