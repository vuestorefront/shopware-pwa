import { addPromotionCode } from "../../../src";
import { apiService } from "../../../src/apiService";
import { random } from "faker";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - addPromotionCode", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call valid endpoint and return a cart", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          name: random.uuid(),
          token: random.uuid(),
          price: {
            netPrice: 150
          },
          lineItems: {
            type: "promotion",
            payload: {
              code: "3a64e872ca404522a2c5d43ebc751e6b"
            }
          }
        }
      }
    });

    let promotionCode = "3a64e872ca404522a2c5d43ebc751e6b";

    const result = await addPromotionCode(promotionCode);
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      `/checkout/cart/code/3a64e872ca404522a2c5d43ebc751e6b`
    );
    expect(result.price.netPrice).toEqual(150);
  });

  it("should throw unhandled 404 error when empty promotion code given", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("404: Not Found"));

    let promotionCode = "";

    expect(addPromotionCode(promotionCode)).rejects.toThrow("404: Not Found");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith("/checkout/cart/code/");
  });
});
