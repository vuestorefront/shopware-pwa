import { changeCartItemQuantity } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";
import { random, commerce } from "faker";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - changeCartItemQuantity", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call valid endpoint and return cart with no items", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: {
        name: random.uuid(),
        token: random.uuid(),
        lineItems: [
          {
            id: "geawq90a5dab4206843d0vc3sa8wefdf",
            label: commerce.productName(),
            quantity: 3,
            payload: {
              productNumber: random.uuid
            }
          }
        ]
      }
    });

    let lineItemId = "geawq90a5dab4206843d0vc3sa8wefdf";

    const result = await changeCartItemQuantity(lineItemId, 3);
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(
      mockedAxios.patch
    ).toBeCalledWith(
      "/checkout/cart/line-item/geawq90a5dab4206843d0vc3sa8wefdf",
      { quantity: 3 }
    );
    expect(result.lineItems[0].quantity).toEqual(3);
  });

  it("should throw unhandled 400 error when non-existing lineItemId given", async () => {
    mockedAxios.patch.mockRejectedValueOnce(
      new Error("400: CHECKOUT__CART_LINEITEM_NOT_FOUND")
    );

    let lineItemId = "someNonExistingLineItemId";

    expect(changeCartItemQuantity(lineItemId, 1)).rejects.toThrow(
      "400: CHECKOUT__CART_LINEITEM_NOT_FOUND"
    );
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      "/checkout/cart/line-item/someNonExistingLineItemId",
      {
        quantity: 1
      }
    );
  });

  it("should throw unhandled 400 error when negative quantity given", async () => {
    mockedAxios.patch.mockRejectedValueOnce(
      new Error("400: CHECKOUT__CART_INVALID_LINEITEM_QUANTITY")
    );

    let lineItemId = "geawq90a5dab4206843d0vc3sa8wefdf";

    expect(changeCartItemQuantity(lineItemId, -2)).rejects.toThrow(
      "400: CHECKOUT__CART_INVALID_LINEITEM_QUANTITY"
    );
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      "/checkout/cart/line-item/geawq90a5dab4206843d0vc3sa8wefdf",
      {
        quantity: -2
      }
    );
  });
});
