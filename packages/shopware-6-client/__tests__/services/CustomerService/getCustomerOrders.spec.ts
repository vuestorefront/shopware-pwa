import { getCustomerOrders } from "@shopware-pwa/shopware-6-client";
import { getCustomerOrderEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - getCustomerOrders", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return array of orders", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            orderNumber: "1234"
          },
          {
            orderNumber: "4321"
          }
        ]
      }
    });
    const result = await getCustomerOrders();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(getCustomerOrderEndpoint());
    expect(result).toMatchObject([
      {
        orderNumber: "1234"
      },
      {
        orderNumber: "4321"
      }
    ]);
  });
});
