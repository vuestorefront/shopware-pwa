import { getStoreOrderPaymentUrl } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockApiInstance = defaultInstance as jest.Mocked<typeof defaultInstance>;

describe("CheckoutService - getStoreOrderPaymentUrl", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });

  it("should invoke correct API endpoint with given parameters", async () => {
    mockedGet.mockResolvedValueOnce({ data: {} });
    await getStoreOrderPaymentUrl("cd1a64c7166f42fa88b212b81e611d57");
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith("/store-api/v1/handle-payment", {
      params: { orderId: "cd1a64c7166f42fa88b212b81e611d57" },
    });
  });

  it("should throw an error when data is incorrect", async () => {
    mockedGet.mockRejectedValueOnce(new Error("404"));
    expect(getStoreOrderPaymentUrl(null as any)).rejects.toThrowError(
      "getStoreOrderPaymentUrl method requires orderId"
    );
    expect(mockedGet).not.toBeCalled();
  });

  it("should return correct data for orderId", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        redirectResponse: null,
        apiAlias: "array_struct",
      },
    });
    const result = await getStoreOrderPaymentUrl(
      "cd1a64c7166f42fa88b212b81e611d57"
    );
    expect(result).toEqual({
      redirectResponse: null,
      apiAlias: "array_struct",
    });
  });
});
