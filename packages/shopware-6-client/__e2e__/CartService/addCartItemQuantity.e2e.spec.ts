import {update, addCartItemQuantity, addProductToCart} from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CartService - addCartItemQuantity", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should test add cart item quantity response", async() => {
    await addProductToCart(
      "044a190a54ab4f06803909c3ee8063ef",
      2
    );
    const result = await addCartItemQuantity("044a190a54ab4f06803909c3ee8063ef", 2)
    expect(result).toMatchSnapshot();
  });

  it("should test add cart item quantity error response", async() => {
    try {
      await addCartItemQuantity("044a190a54ab4f06803909c3ee8063ef", 2)
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});