import { defaultInstance } from "../../../src/apiService";
import { getPaymentMethodDetails } from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("ContextService - getPaymentMethodDetails", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return an object of specific payment method details", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        data: {
          id: "paypal",
        },
      },
    });

    const result = await getPaymentMethodDetails("paypal");
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith(
      "/sales-channel-api/v1/payment-method/paypal"
    );
    expect(result).toHaveProperty("id");
    expect(result.id).toBe("paypal");
  });
});
