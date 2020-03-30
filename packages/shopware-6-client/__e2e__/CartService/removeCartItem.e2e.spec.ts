import {
  addProductToCart,
  removeCartItem,
  update,
} from "@shopware-pwa/shopware-6-client";
describe("shopware-6-client - E2E - CartService - addCartItemQuantity", () => {
  beforeEach(() => {
    update({});
  });

  it("should remove product from cart", async () => {
    await addProductToCart("9cce06f9dc424844989a06cfe3dc98da", 2);
    const result = await removeCartItem("9cce06f9dc424844989a06cfe3dc98da");
    result.token = "mockedToken";
    expect(result).toMatchSnapshot();
  });

  it("should return error when product doesn't exit in cart", async () => {
    try {
      await removeCartItem("044a190a54ab4f06803909c3ee8063ef");
      expect("didn't throw an error").toEqual("should throw an error");
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
