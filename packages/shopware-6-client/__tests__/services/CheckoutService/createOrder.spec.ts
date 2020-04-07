import { createOrder, createGuestOrder } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";
import { GuestOrderParams } from "@shopware-pwa/commons/interfaces/request/GuestOrderParams";

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
    const createGuestOrderData: GuestOrderParams = {
      email: "some@email.com",
      salutationId: "2bbb89dfa4664bc581e80b37eaa80fa7",
      firstName: "Joe",
      lastName: "Doe",
      billingAddress: {
        countryId: "0bbb89dfa4664bc581e80b37eaa80fb7",
        salutationId: "2bbb89dfa4664bc581e80b37eaa80fa7",
        street: "Shopstreet",
        zipcode: "51-123",
        city: "Wroclaw",
      },
    };
    it("should return undefined when there is no data property in the response", async () => {
      mockedAxios.post.mockResolvedValueOnce({});

      const result = await createGuestOrder(createGuestOrderData);
      expect(mockedAxios.post).toBeCalledTimes(1);
      expect(mockedAxios.post).toBeCalledWith(
        "/checkout/guest-order",
        createGuestOrderData
      );
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

      const result = await createGuestOrder(createGuestOrderData);
      expect(mockedAxios.post).toBeCalledTimes(1);
      expect(mockedAxios.post).toBeCalledWith(
        "/checkout/guest-order",
        createGuestOrderData
      );
      expect(result).toHaveProperty("id");
    });

    it("should throws the error when email is not provided", async () => {
      try {
        await createGuestOrder(undefined as any);
      } catch (e) {
        expect(e.message).toBe(
          "createGuestOrder method requires GuestOrderParams"
        );
      }
    });
  });
});
