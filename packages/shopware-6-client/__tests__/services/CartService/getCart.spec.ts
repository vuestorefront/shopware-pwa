import { getCart } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - getCart", () => {
  it("should return existing cart object", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        name: "3a64e872ca404522a2c5d43ebc751e6b",
        token: "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6",
        lineItems: [
          {
            id: "geawq90a5dab4206843d0vc3sa8wefdf",
            label: "Red T-Shirt",
            quantity: 5,
            payload: {
              productNumber: "aaaa190a54ab4f06803909c3ee8063ef"
            }
          },
          {
            id: "bbbwq90a5dab4206843d0vc3sa8wefdf",
            label: "Red T-Shirt",
            quantity: 5,
            payload: {
              productNumber: "zzza190a54ab4f06803909c3ee8063ef"
            }
          }
        ]
      }
    });

    const result = await getCart();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/checkout/cart");
    expect(result.lineItems).not.toBeNull();
  });
});
