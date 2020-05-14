import { apiService } from "../../../src/apiService";
import { getAvailablePaymentMethods } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getAvailablePaymentMethods", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return array with payment methods", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { total: 2 } });

    const result = await getAvailablePaymentMethods();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      "/sales-channel-api/v1/payment-method"
    );
    expect(result.total).toEqual(2);
  });
});
