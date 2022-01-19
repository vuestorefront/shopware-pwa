import { handlePayment } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockApiInstance = defaultInstance as jest.Mocked<typeof defaultInstance>;

describe("CheckoutService - handlePayment", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });

  it("should invoke correct API endpoint with given parameters", async () => {
    mockedGet.mockResolvedValueOnce({ data: {} });
    await handlePayment({orderId: "cd1a64c7166f42fa88b212b81e611d57", finishUrl: "https://some.finish.url.com", errorUrl: "https://some.error.url.com"});
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith("/store-api/handle-payment", {
      params: { 
        "orderId": "cd1a64c7166f42fa88b212b81e611d57",
        "errorUrl": "https://some.error.url.com",
        "finishUrl": "https://some.finish.url.com",
        "paymentDetails": undefined,
      },
    });
  });

  it("should throw an error when data is incorrect", async () => {
    mockedGet.mockRejectedValueOnce(new Error("404"));
    expect(handlePayment(null as any)).rejects.toThrowError(
      "handlePayment method requires orderId"
    );
    expect(mockedGet).not.toBeCalled();
  });

  it("should throw an error when data has missing orderId", async () => {
    mockedGet.mockRejectedValueOnce(new Error("404"));
    expect(handlePayment({} as any)).rejects.toThrowError(
      "handlePayment method requires orderId"
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
    const result = await handlePayment({orderId: "cd1a64c7166f42fa88b212b81e611d57"});
    expect(result).toEqual({
      redirectResponse: null,
      apiAlias: "array_struct",
    });
  });
});
