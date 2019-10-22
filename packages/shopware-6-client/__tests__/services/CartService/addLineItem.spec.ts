import { addLineItem } from "@shopware-pwa/shopware-6-client";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CartService - addLineItem", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call valid endpoint and return a cart", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        name: "3a64e872ca404522a2c5d43ebc751e6b",
        token: "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6",
        lineItems: [
          {
            id: "geawq90a5dab4206843d0vc3sa8wefdf",
            label: "Red T-Shirt",
            quantity: 5,
            payload: {
              productNumber: "aaaa190a54ab4f06803909c3ee8063ef"
            }
          }
        ]
      }
    });

    let lineItemId = "geawq90a5dab4206843d0vc3sa8wefdf";

    const result = await addLineItem(lineItemId, 3);
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/checkout/cart/line-item/geawq90a5dab4206843d0vc3sa8wefdf",
      {
        type: "product",
        quantity: 3
      }
    );
    expect(result.lineItems[0].quantity).toEqual(5);
  });

  it("should throw unhandled 500 error when non-existing lineItemId given", async () => {
    mockedAxios.post.mockRejectedValueOnce(
      new Error("500: FRAMEWORK__INCONSISTENT_CRITERIA_IDS")
    );

    let lineItemId = "someNonExistingLineItemId";

    expect(addLineItem(lineItemId, 1)).rejects.toThrow(
      "500: FRAMEWORK__INCONSISTENT_CRITERIA_IDS"
    );
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/checkout/cart/line-item/someNonExistingLineItemId",
      {
        quantity: 1,
        type: "product"
      }
    );
  });

  it("should throw unhandled 400 error when negative quantity given", async () => {
    mockedAxios.post.mockRejectedValueOnce(
      new Error("400: CHECKOUT__CART_INVALID_LINEITEM_QUANTITY")
    );

    let lineItemId = "geawq90a5dab4206843d0vc3sa8wefdf";

    expect(addLineItem(lineItemId, -2)).rejects.toThrow(
      "400: CHECKOUT__CART_INVALID_LINEITEM_QUANTITY"
    );
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      "/checkout/cart/line-item/geawq90a5dab4206843d0vc3sa8wefdf",
      {
        quantity: -2,
        type: "product"
      }
    );
  });

  it("should throw unhandled 404 error when empty lineItemId given", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("404: Not Found"));

    let lineItemId = "";

    expect(addLineItem(lineItemId, 2)).rejects.toThrow("404: Not Found");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith("/checkout/cart/line-item/", {
      quantity: 2,
      type: "product"
    });
  });
});
