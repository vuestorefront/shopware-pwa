import {update, addCartItemQuantity, addProductToCart} from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CartService - addCartItemQuantity", () => {
  beforeEach(() => {
    update({ contextToken: "" });
  });

  it("should add cart item quantity response", async() => {
    await addProductToCart("9cce06f9dc424844989a06cfe3dc98da", 2);
    const result = await addCartItemQuantity("9cce06f9dc424844989a06cfe3dc98da", 2);
    result.token = "mockedToken";
    expect(result).toMatchSnapshot();
  });

  it("should test add cart item quantity error response", async() => {
    try {
      await addCartItemQuantity("044a190a54ab4f06803909c3ee8063ef", 2);
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});