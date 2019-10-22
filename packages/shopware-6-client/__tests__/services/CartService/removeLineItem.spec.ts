import { removeLineItem } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - removeLineItem", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call valid endpoint and return cart with no deleted item", async () => {
    mockedAxios.delete.mockResolvedValueOnce({
      data: {
        name: "3a64e872ca404522a2c5d43ebc751e6b",
        token: "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6",
        lineItems: []
      }
    });

    let lineItemId = "geawq90a5dab4206843d0vc3sa8wefdf";

    const result = await removeLineItem(lineItemId);
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

    expect(removeLineItem(lineItemId)).rejects.toThrow(
      "400: CHECKOUT__CART_LINEITEM_NOT_FOUND"
    );
    expect(mockedAxios.delete).toBeCalledTimes(1);
    expect(mockedAxios.delete).toBeCalledWith(
      "/checkout/cart/line-item/someNonExistingLineItemId"
    );
  });
});
