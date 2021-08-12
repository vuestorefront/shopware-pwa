import { getCustomer } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";
jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - getCustomer", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("should return current customer's data - using correct token", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { id: "c370eb5cd1df4d4dbcc78f055b693e79" },
    });
    const result: any = await getCustomer();
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/account/customer", {});
    expect(result).not.toBeNull();
    expect(result.id).toEqual("c370eb5cd1df4d4dbcc78f055b693e79");
  });

  it("should return null when user not logged in", async () => {
    mockedPost.mockRejectedValueOnce({
      statusCode: 403,
    });
    const result = await getCustomer();
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/account/customer", {});
    expect(result).toBeNull();
  });

  it("should throw an error on status code different than 403", async () => {
    mockedPost.mockRejectedValueOnce({
      response: {
        status: 401,
      },
    });
    await expect(getCustomer()).rejects.toThrowError(
      "Unexpected getCustomerResponse."
    );
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/account/customer", {});
  });
});
