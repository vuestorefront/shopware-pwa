import { getCustomerOrderDetails } from "@shopware-pwa/shopware-6-client";
import { getCustomerOrderDetailsEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - getCustomerOrderDetails", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return order object", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          id: "12345-ab",
          orderNumber: "7020"
        }
      }
    });
    const result = await getCustomerOrderDetails("12345-ab");
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      getCustomerOrderDetailsEndpoint("12345-ab")
    );
    expect(result).toMatchObject({
      id: "12345-ab",
      orderNumber: "7020"
    });
  });
});
