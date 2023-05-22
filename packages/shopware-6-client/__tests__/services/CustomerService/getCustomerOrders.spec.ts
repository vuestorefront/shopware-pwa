import { getCustomerOrders } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - getCustomerOrders", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("should return empty array if no elements are in the response", async () => {
    mockedPost.mockResolvedValueOnce({
      data: {
        elements: null,
      },
    });
    const result = await getCustomerOrders();
    expect(result).toBeUndefined();
  });

  it("should return array of orders", async () => {
    mockedPost.mockResolvedValueOnce({
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
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/order", {});
    expect(result).toMatchObject({
      elements: [
        {
          orderNumber: "1234",
        },
        {
          orderNumber: "4321",
        },
      ],
    });
  });
});
