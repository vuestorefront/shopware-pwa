import { removeCartItem } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";
import { random } from "faker";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - removeCartItem", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call valid endpoint and return cart without deleted item", async () => {
    mockedAxios.delete.mockResolvedValueOnce({
      data: {
        data: {
          name: random.uuid(),
          token: random.uuid(),
          lineItems: []
        }
      }
    });

    let lineItemId = "geawq90a5dab4206843d0vc3sa8wefdf";

    const result = await removeCartItem(lineItemId);
    expect(mockedAxios.delete).toBeCalledTimes(1);
    expect(mockedAxios.delete).toBeCalledWith(
      "/checkout/cart/line-item/geawq90a5dab4206843d0vc3sa8wefdf"
    );
    expect(result.lineItems).toHaveLength(0);
  });

  it("should throw unhandled 400 error when non-existing lineItemId given", async () => {
    mockedAxios.delete.mockRejectedValueOnce(
      new Error("400: CHECKOUT__CART_LINEITEM_NOT_FOUND")
    );

    let lineItemId = "someNonExistingLineItemId";

    expect(removeCartItem(lineItemId)).rejects.toThrow(
      "400: CHECKOUT__CART_LINEITEM_NOT_FOUND"
    );
    expect(mockedAxios.delete).toBeCalledTimes(1);
    expect(mockedAxios.delete).toBeCalledWith(
      "/checkout/cart/line-item/someNonExistingLineItemId"
    );
  });
});
