import { apiService } from "../../../src/apiService";
import { getAvailableShippingMethods } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getAvailableShippingMethods", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array with shipping methods", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { total: 2 } });

    const result = await getAvailableShippingMethods();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      "/sales-channel-api/v1/shipping-method"
    );
    expect(result.total).toEqual(2);
  });
});
