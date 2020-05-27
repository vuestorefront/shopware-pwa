import { apiService } from "../../../src/apiService";
import { getPaymentMethodDetails } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - getPaymentMethodDetails", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should return an object of specific payment method details", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          id: "paypal",
        },
      },
    });

    const result = await getPaymentMethodDetails("paypal");
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      "/sales-channel-api/v1/payment-method/paypal"
    );
    expect(result).toHaveProperty("id");
    expect(result.id).toBe("paypal");
  });
});
