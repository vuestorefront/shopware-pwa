import {addProductToCart, removeCartItem} from "@shopware-pwa/shopware-6-client";
describe("shopware-6-client - E2E - CartService - addCartItemQuantity", () => {
  it("should test remove product from cart response", async() => {
    await addProductToCart("044a190a54ab4f06803909c3ee8063ef", 2);
    const result = await removeCartItem("044a190a54ab4f06803909c3ee8063ef")
    expect(result).toMatchSnapshot()
  });

  it("should test remove product from cart error reponse", async() => {
    try {
      await removeCartItem("044a190a54ab4f06803909c3ee8063ef")
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});