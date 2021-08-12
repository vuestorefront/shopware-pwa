import { changeOrderPaymentMethod } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CheckoutService", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  describe("changeOrderPaymentMethod", () => {
    it("should invoke post method to the appriopriate endpoint with corresponding parameters", async () => {
      mockedPost.mockResolvedValueOnce({});

      const result = await changeOrderPaymentMethod(
        "some-order-id",
        "some-payment-id"
      );
      expect(mockedPost).toBeCalledTimes(1);
      expect(mockedPost).toBeCalledWith("/store-api/order/payment", {
        orderId: "some-order-id",
        paymentMethodId: "some-payment-id",
      });
      expect(result).toBeUndefined();
    });
  });
});
