import { getCustomer } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";
jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - getCustomer", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });

  it("should return current customer's data - using correct token", async () => {
    mockedGet.mockResolvedValueOnce({
      data: { id: "c370eb5cd1df4d4dbcc78f055b693e79" },
    });
    const result: any = await getCustomer();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v1/account/customer", {
      params: "associations[salutation][]",
    });
    expect(result).not.toBeNull();
    expect(result.id).toEqual("c370eb5cd1df4d4dbcc78f055b693e79");
  });

  it("should return null when user not logged in", async () => {
    mockedGet.mockRejectedValueOnce({
      statusCode: 403,
    });
    const result = await getCustomer();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v1/account/customer", {
      params: "associations[salutation][]",
    });
    expect(result).toBeNull();
  });

  it("should throw an error on status code different than 403", async () => {
    mockedGet.mockRejectedValueOnce({
      response: {
        status: 401,
      },
    });
    await expect(getCustomer()).rejects.toThrowError(
      "Unexpected getCustomerResponse."
    );
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/v1/account/customer", {
      params: "associations[salutation][]",
    });
  });
});
