import { createOrder } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CheckoutService createOrder", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  describe("createOrder", () => {
    it("should return undefined when there is no data property in the response", async () => {
      mockedPost.mockResolvedValueOnce({});

      const result = await createOrder();
      expect(mockedPost).toBeCalledTimes(1);
      expect(mockedPost).toBeCalledWith("/store-api/checkout/order");
      expect(result).toBeUndefined();
    });
    it("should return newly added order object", async () => {
      mockedPost.mockResolvedValueOnce({
        data: {
          id: "new-order-id",
        },
      });

      const result = await createOrder();
      expect(mockedPost).toBeCalledTimes(1);
      expect(mockedPost).toBeCalledWith("/store-api/checkout/order");
      expect(result).toHaveProperty("id");
    });
  });
});
