import { cancelOrder } from "@shopware-pwa/shopware-6-client";
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
  describe("cancelOrder", () => {
    it("should invoke post method to the cancel order endpoint with corresponding orderId parameter", async () => {
      mockedPost.mockResolvedValueOnce({});

      const result = await cancelOrder("some-order-id");
      expect(mockedPost).toBeCalledTimes(1);
      expect(mockedPost).toBeCalledWith("/store-api/order/state/cancel", {
        orderId: "some-order-id",
      });
      expect(result).toBeUndefined();
    });
  });
});
