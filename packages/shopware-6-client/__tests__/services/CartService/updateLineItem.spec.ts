import { updateLineItem } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - addLineItem", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call valid endpoint and return cart with no items", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: {
        name: "3a64e872ca404522a2c5d43ebc751e6b",
        token: "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6",
        lineItems: [
          {
            id: "geawq90a5dab4206843d0vc3sa8wefdf",
            label: "Red T-Shirt",
            quantity: 3,
            payload: {
              productNumber: "aaaa190a54ab4f06803909c3ee8063ef"
            }
          }
        ]
      }
    });

    let lineItemId = "geawq90a5dab4206843d0vc3sa8wefdf";

    const result = await updateLineItem(lineItemId, 3);
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      "/checkout/cart/line-item/geawq90a5dab4206843d0vc3sa8wefdf",
      { quantity: 3 }
    );
    expect(result.lineItems[0].quantity).toEqual(3);
  });
});
