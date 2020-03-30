import { getCart } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";
import { random, commerce } from "faker";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - getCart", () => {
  it("should return existing cart object", async () => {
    mockedAxios.get.mockResolvedValueOnce({
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
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith("/checkout/cart");
    expect(result.lineItems).not.toBeNull();
  });
});
