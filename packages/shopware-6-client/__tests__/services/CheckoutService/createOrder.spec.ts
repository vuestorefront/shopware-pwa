import { createOrder, createGuestOrder } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CheckoutService createOrder", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("createOrder", () => {
    it("should return undefined when there is no data property in the response", async () => {
      mockedAxios.post.mockResolvedValueOnce({});

      const result = await createOrder();
      expect(mockedAxios.post).toBeCalledTimes(1);
      expect(mockedAxios.post).toBeCalledWith("/checkout/order");
      expect(result).toBeUndefined();
    });
    it("should return newly added order object", async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: {
          data: {
            id: "new-order-id",
          },
        },
      });

      const result = await createOrder();
      expect(mockedAxios.post).toBeCalledTimes(1);
      expect(mockedAxios.post).toBeCalledWith("/checkout/order");
      expect(result).toHaveProperty("id");
    });
  });
  describe("createGuestOrder", () => {
    it("should return undefined when there is no data property in the response", async () => {
      mockedAxios.post.mockResolvedValueOnce({});

      const result = await createGuestOrder("some@email.com");
      expect(mockedAxios.post).toBeCalledTimes(1);
      expect(mockedAxios.post).toBeCalledWith("/checkout/guest-order", {
        email: "some@email.com",
      });
      expect(result).toBeUndefined();
    });
    it("should return newly added order object", async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: {
          data: {
            id: "new-order-id",
          },
        },
      });

      const result = await createGuestOrder("dummy@email.com");
      expect(mockedAxios.post).toBeCalledTimes(1);
      expect(mockedAxios.post).toBeCalledWith("/checkout/guest-order", {
        email: "dummy@email.com",
      });
      expect(result).toHaveProperty("id");
    });

    it("should throws the error when email is not provided", async () => {
      try {
        await createGuestOrder(undefined as any);
      } catch (e) {
        expect(e.message).toBe(
          "createGuestOrder method requires email to be provided as a parameter"
        );
      }
    });
  });
});
