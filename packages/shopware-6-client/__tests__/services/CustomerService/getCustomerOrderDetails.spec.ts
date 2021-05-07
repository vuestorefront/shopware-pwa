import { getCustomerOrderDetails } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - getCustomerOrderDetails", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });

  it("should return undefined if no orderId given", async () => {
    const result = await getCustomerOrderDetails(undefined as any);
    expect(mockedGet).toBeCalledTimes(0);
    expect(result).toBeUndefined();
  });
  it("should use the custom queryParams if any provided", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {},
    });
    await getCustomerOrderDetails(
      "12345",
      undefined,
      "associations[transactions][]&sort=-id"
    );
    expect(mockedGet).toBeCalledWith("/store-api/order", {
      params: "filter[id]=12345&associations[transactions][]&sort=-id",
    });
  });
  it("should return undefined if there is no order in the response", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        orders: {
          elements: [],
        },
      },
    });
    const result = await getCustomerOrderDetails("1234");
    expect(result).toBeUndefined();
  });
  it("should return undefined if there is no orders object in the response", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {},
    });
    const result = await getCustomerOrderDetails("1234");
    expect(result).toBeUndefined();
  });
  it("should return order object", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        orders: {
          elements: [
            {
              id: "12345-ab",
              orderNumber: "7020",
            },
          ],
        },
      },
    });
    const result = await getCustomerOrderDetails("12345-ab");
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/store-api/order", {
      params:
        "sort=-transactions.createdAt&limit=1&filter[id]=12345-ab&associations[lineItems][]&associations[addresses][]&associations[transactions][associations][paymentMethod][]&associations[deliveries][associations][shippingMethod][]",
    });
    expect(result).toMatchObject({
      id: "12345-ab",
      orderNumber: "7020",
    });
  });
});
