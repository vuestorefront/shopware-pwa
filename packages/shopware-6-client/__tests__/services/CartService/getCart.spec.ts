import { getCart, update } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - getCart", () => {
  beforeEach(() => {
    update({ contextToken: "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" });
    jest.resetAllMocks();
  });

  it("should return existing cart object", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        name: "3a64e872ca404522a2c5d43ebc751e6b",
        token: "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6",
        lineItems: {
          label: "Red T-Shirt",
          quantity: 2
        }
      }
    });

    let cartName = "3a64e872ca404522a2c5d43ebc751e6b";

    const result = await getCart();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/checkout/cart");
    expect(result.lineItems).not.toBeNull();
    expect(result.name).toEqual(cartName);
  });
});
