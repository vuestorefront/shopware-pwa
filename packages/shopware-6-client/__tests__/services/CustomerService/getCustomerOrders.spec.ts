import { getCustomerOrders } from "@shopware-pwa/shopware-6-client";
import { getCustomerOrderEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - getCustomerOrders", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });

  it("should return empty array if no elements are in the response", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        elements: null,
      },
    });
    const result = await getCustomerOrders();
    expect(result).toStrictEqual([]);
  });

  it("should return array of orders", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        orders: {
          elements: [
            {
              orderNumber: "1234",
            },
            {
              orderNumber: "4321",
            },
          ],
        },
      },
    });
    const result = await getCustomerOrders();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith(
      `${getCustomerOrderEndpoint()}?sort=-createdAt`
    );
    expect(result).toMatchObject([
      {
        orderNumber: "1234",
      },
      {
        orderNumber: "4321",
      },
    ]);
  });
});
