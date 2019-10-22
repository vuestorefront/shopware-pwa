import { addCode } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - addCode", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call valid endpoint and return a cart", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        name: "3a64e872ca404522a2c5d43ebc751e6b",
        token: "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6",
        price: {
          netPrice: 150
        },
        lineItems: {
          type: "promotion",
          payload: {
            code: "your_secret_discount_code_239kfdu24"
          }
        }
      }
    });

    let discountCode = "your_secret_discount_code_239kfdu24";

    const result = await addCode(discountCode);
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/checkout/cart/code/your_secret_discount_code_239kfdu24"
    );
    expect(result.price.netPrice).toEqual(150);
  });
});
