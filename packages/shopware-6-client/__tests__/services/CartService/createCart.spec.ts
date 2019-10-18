import { createCart } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - createCart", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return a context token", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" }
    });

    const result = await createCart();
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith("/checkout/cart");
    expect(result.contextToken).toEqual("NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6");
  });
});
