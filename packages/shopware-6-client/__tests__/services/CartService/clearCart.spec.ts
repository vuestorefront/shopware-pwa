import { clearCart } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";
import { random } from "faker";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CartService - clearCart", () => {
  let contextToken = random.uuid();

  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("should return a context token", async () => {
    mockedPost.mockResolvedValueOnce({
      data: { "sw-context-token": contextToken },
    });

    const result = await clearCart();
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/sales-channel-api/v1/checkout/cart");
    expect(result.contextToken).toEqual(contextToken);
  });
});
