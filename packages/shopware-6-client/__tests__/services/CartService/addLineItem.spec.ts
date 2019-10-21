import { addLineItem } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - addLineItem", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call valid endpoint and return a cart", async () => {
    mockedAxios.post.mockResolvedValueOnce({
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
          }
        ]
      }
    });

    let lineItemId = "geawq90a5dab4206843d0vc3sa8wefdf";

    const result = await addLineItem(lineItemId, 3);
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/checkout/cart/line-item/geawq90a5dab4206843d0vc3sa8wefdf",
      {
        type: "product",
        quantity: 3
      }
    );
    expect(result.lineItems[0].quantity).toEqual(5);
  });
});
