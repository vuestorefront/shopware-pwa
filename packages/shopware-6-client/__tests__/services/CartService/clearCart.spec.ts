import { clearCart } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";
import { random } from "faker";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - clearCart", () => {
  let contextToken = random.uuid();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return a context token", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { "sw-context-token": contextToken },
    });

    const result = await clearCart();
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/sales-channel-api/v1/checkout/cart"
    );
    expect(result.contextToken).toEqual(contextToken);
  });
});
