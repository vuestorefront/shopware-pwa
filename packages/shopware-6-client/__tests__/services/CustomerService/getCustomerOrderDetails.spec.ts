import { getCustomerOrderDetails } from "@shopware-pwa/shopware-6-client";
import { getCustomerOrderEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - getCustomerOrderDetails", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return undefined if no orderId given", async () => {
    const result = await getCustomerOrderDetails(undefined as any);
    expect(mockedAxios.get).toBeCalledTimes(0);
    expect(result).toBeUndefined();
  });
  it("should return undefined if there is no order in the response", async () => {
    mockedAxios.get.mockResolvedValueOnce({
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
    mockedAxios.get.mockResolvedValueOnce({
      data: {},
    });
    const result = await getCustomerOrderDetails("1234");
    expect(result).toBeUndefined();
  });
  it("should return order object", async () => {
    mockedAxios.get.mockResolvedValueOnce({
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
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      `${getCustomerOrderEndpoint()}?filter[id]=12345-ab&associations[lineItems][]`
    );
    expect(result).toMatchObject({
      id: "12345-ab",
      orderNumber: "7020",
    });
  });
});
