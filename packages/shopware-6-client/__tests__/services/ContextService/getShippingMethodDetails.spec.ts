import { apiService } from "../../../src/apiService";
import { getShippingMethodDetails } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getShippingMethodDetails", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return an object of specific shipping method details", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          id: "dhl",
        },
      },
    });

    const result = await getShippingMethodDetails("dhl");
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      "/sales-channel-api/v1/shipping-method/dhl"
    );
    expect(result).toHaveProperty("id");
    expect(result.id).toBe("dhl");
  });
});
