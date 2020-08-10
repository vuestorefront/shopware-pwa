import { getCart } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";
import { random, commerce } from "faker";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CartService - getCart", () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      get: mockedGet,
    } as any;
  });
  it("should return existing cart object", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        data: {
          name: random.uuid(),
          token: random.uuid(),
          lineItems: [
            {
              id: random.uuid(),
              label: commerce.productName(),
              quantity: 5,
              payload: {
                productNumber: random.uuid(),
              },
            },
            {
              id: random.uuid(),
              label: commerce.productName(),
              quantity: 3,
              payload: {
                productNumber: random.uuid(),
              },
            },
          ],
        },
      },
    });

    const result = await getCart();
    expect(mockedGet).toBeCalledTimes(1);
    expect(mockedGet).toBeCalledWith("/sales-channel-api/v3/checkout/cart");
    expect(result.lineItems).not.toBeNull();
  });
});
